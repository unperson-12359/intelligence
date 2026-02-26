import { NextRequest, NextResponse } from "next/server";

// In-memory store for human tips until database is connected
const pendingTips: Array<{
  id: string;
  figureName: string;
  whatHappened: string;
  sourceUrl?: string;
  submittedAt: string;
  status: "pending";
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { figureName, whatHappened, sourceUrl } = body;

    const errors: string[] = [];
    if (!figureName || typeof figureName !== "string" || figureName.trim().length < 2) {
      errors.push("Figure name is required (at least 2 characters)");
    }
    if (!whatHappened || typeof whatHappened !== "string" || whatHappened.trim().length < 10) {
      errors.push("Please describe what happened (at least 10 characters)");
    }
    if (sourceUrl && typeof sourceUrl === "string" && sourceUrl.trim()) {
      try {
        new URL(sourceUrl);
      } catch {
        errors.push("Source URL must be a valid URL");
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", message: errors.join(". "), details: errors },
        { status: 400 }
      );
    }

    const tip = {
      id: `tip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      figureName: figureName.trim(),
      whatHappened: whatHappened.trim(),
      sourceUrl: sourceUrl?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      status: "pending" as const,
    };

    pendingTips.push(tip);

    return NextResponse.json(
      {
        success: true,
        message: "Your tip has been submitted. AI will research and verify it.",
        contributionId: tip.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request", message: "Could not parse request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalPending: pendingTips.length,
    message: "Contribution review queue.",
  });
}
