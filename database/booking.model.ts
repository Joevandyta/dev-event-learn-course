import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

/**
 * Interface representing Booking document attributes.
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => EMAIL_REGEX.test(v),
        message: "Please enter a valid email address",
      },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Pre-save hook: verifies that the referenced Event exists in database.
 */
BookingSchema.pre<IBooking>("save", async function () {
  if (this.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error(
        `Referenced Event with ID '${this.eventId}' does not exist.`,
      );
    }
  }
});

//Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

//Create compount index for common queries(event bookings by date)
BookingSchema.index({ eventId: 1, createdAt: -1 });

//create index on email for user booking lookups
BookingSchema.index({ email: 1 });

//Enforce one booking per event per email
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: "uniq_event_email" },
);

export const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);
export default Booking;
