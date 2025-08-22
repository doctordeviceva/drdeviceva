import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Add GET method for testing environment variables
export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.RESEND_API_KEY,
    fromEmail: process.env.FROM_EMAIL || "onboarding@resend.dev",
    message: "Environment check endpoint"
  });
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    // Add debug logging
    console.log("Received email request:", { to, subject, html: html ? "HTML content present" : "No HTML" });

    // Validate required fields
    if (!to || !subject || !html) {
      console.log("Validation failed - missing fields:", { to: !!to, subject: !!subject, html: !!html });
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Determine from address based on environment
    const fromEmail = process.env.FROM_EMAIL || "noreply@doctordevice.net";
    console.log("Using from email:", fromEmail);
    
    // With a verified domain, you can send to any recipient
    console.log("Attempting to send email to:", to);
    console.log("Using verified domain:", fromEmail);
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `Doctor Device VA <${fromEmail}>`,
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend error details:", {
        error: error,
        fromEmail: fromEmail,
        to: to
      });
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
