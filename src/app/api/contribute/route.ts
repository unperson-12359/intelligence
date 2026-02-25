import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Not implemented",
      message: "Contribution API coming in Phase 2. Visit /contribute to learn more.",
    },
    { status: 501 }
  );
}
