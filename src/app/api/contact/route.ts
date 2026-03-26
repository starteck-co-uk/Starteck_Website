import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // For now, log the contact submission
    // In production, integrate with Resend, SendGrid, or similar
    console.log("Contact form submission:", {
      name,
      email,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

    // You can add email sending here later:
    // await resend.emails.send({ ... })

    return NextResponse.json(
      { success: true, message: "Message received successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
