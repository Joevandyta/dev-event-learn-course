"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}
const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link
      href={`/events/${slug}`}
      id="event-card"
      onClick={() => {
        posthog.capture("event_card_opened", { event_slug: slug });
      }}
    >
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="poster"
      />
      <div className="flex flex-row gap-2">
        <Image src="/icons/pin.svg" alt="Calendar" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>

      <div className="datetime">
        <div>
          <Image
            src="/icons/calendar.svg"
            alt="Calendar"
            width={14}
            height={14}
          />
          <p>{date} |</p>
        </div>
        <div>
          <Image src="/icons/clock.svg" alt="Time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
