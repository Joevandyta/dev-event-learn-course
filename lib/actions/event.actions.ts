"use server";

import { Event } from "@/database";
import connectToDatabase from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectToDatabase();

    // get event by slug
    const event = await Event.findOne({ slug: slug });

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};
