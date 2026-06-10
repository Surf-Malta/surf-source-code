import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectSubmission from "@/lib/models/ProjectSubmission";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { companyName, website, email, service, industry, budget, message } = body;

    if (!companyName || !email || !service || !industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const submission = await ProjectSubmission.create({
      companyName,
      website,
      email,
      service,
      industry,
      budget,
      message,
    });

    return NextResponse.json(
      { success: true, data: submission },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Project submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit project request" },
      { status: 500 }
    );
  }
}
