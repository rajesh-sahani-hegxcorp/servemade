import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { quoteRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { items, ...contact } = parsed.data;

  try {
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        ...contact,
        company: contact.company || null,
        phone: contact.phone || null,
        country: contact.country || null,
        message: contact.message || null,
        source: contact.source || "website",
        items: { create: items },
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ id: quoteRequest.id, createdAt: quoteRequest.createdAt }, { status: 201 });
  } catch (error) {
    console.error("Failed to save quote request:", error);
    return NextResponse.json({ error: "Could not save your request. Please try again shortly." }, { status: 500 });
  }
}

// Reject other methods explicitly rather than falling through to a 404.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
