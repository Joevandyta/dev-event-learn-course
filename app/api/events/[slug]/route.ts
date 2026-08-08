import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/events/[slug]
 * Fetches event details by its unique slug.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    // Await dynamic route parameters (Next.js 15+ standard)
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "Invalid or missing slug parameter",
        },
        { status: 400 },
      );
    }

    const cleanSlug = slug.trim().toLowerCase();

    // Ensure database connection
    await connectToDatabase();

    // Query event by slug
    const event = await Event.findOne({ slug: cleanSlug });

    // Handle case when event is not found
    if (!event) {
      return NextResponse.json(
        {
          message: `Event with slug '${cleanSlug}' not found`,
        },
        { status: 404 },
      );
    }

    // Return successful response with event details
    return NextResponse.json(
      {
        message: "Event Fetched Successfully",
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch event details",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
