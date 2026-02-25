import { NextRequest, NextResponse } from "next/server";

// In-memory store for contributions until database is connected
const pendingContributions: Array<{
  id: string;
  figureName: string;
  statementType: string;
  statementContent: string;
  sourceUrl: string;
  dateOccurred: string;
  context?: string;
  submitterEmail?: string;
  submittedAt: string;
  status: "pending";
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { figureName, statementType, statementContent, sourceUrl, dateOccurred, context, submitterEmail } = body;

    const errors: string[] = [];
    if (!figureName || typeof figureName !== "string" || figureName.trim().length < 2) {
      errors.push("Figure name is required (at least 2 characters)");
    }
    if (!statementType || typeof statementType !== "string") {
      errors.push("Statement type is required");
    }
    if (!statementContent || typeof statementContent !== "string" || statementContent.trim().length < 10) {
      errors.push("Statement content is required (at least 10 characters)");
    }
    if (!sourceUrl || typeof sourceUrl !== "string") {
      errors.push("Source URL is required");
    } else {
      try {
        new URL(sourceUrl);
      } catch {
        errors.push("Source URL must be a valid URL");
      }
    }
    if (!dateOccurred || typeof dateOccurred !== "string") {
      errors.push("Date is required");
    }
    if (submitterEmail && typeof submitterEmail === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(submitterEmail)) {
        errors.push("Email must be valid if provided");
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation failed", message: errors.join(". "), details: errors },
        { status: 400 }
      );
    }

    // Create contribution record
    const contribution = {
      id: `contrib-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      figureName: figureName.trim(),
      statementType,
      statementContent: statementContent.trim(),
      sourceUrl: sourceUrl.trim(),
      dateOccurred,
      context: context?.trim() || undefined,
      submitterEmail: submitterEmail?.trim() || undefined,
      submittedAt: new Date().toISOString(),
      status: "pending" as const,
    };

    pendingContributions.push(contribution);

    return NextResponse.json(
      {
        success: true,
        message: "Your contribution has been submitted and is pending review.",
        contributionId: contribution.id,
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
    totalPending: pendingContributions.length,
    message: "Contribution review queue. Full management API coming soon.",
  });
}
