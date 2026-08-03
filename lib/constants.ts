export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA & Online",
    date: "October 24, 2026",
    time: "09:00 AM PST",
  },
  {
    title: "React Summit 2026",
    image: "/images/event2.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands & Online",
    date: "June 12, 2026",
    time: "10:00 AM CEST",
  },
  {
    title: "Global AI & Dev Hackathon",
    image: "/images/event3.png",
    slug: "global-ai-dev-hackathon",
    location: "Online / Virtual",
    date: "November 05, 2026",
    time: "12:00 PM UTC",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event4.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, NV",
    date: "December 01, 2026",
    time: "08:30 AM PST",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event5.png",
    slug: "pycon-us-2026",
    location: "Pittsburgh, PA",
    date: "May 14, 2026",
    time: "09:00 AM EST",
  },
  {
    title: "JSConf Global Meetup",
    image: "/images/event6.png",
    slug: "jsconf-global-meetup",
    location: "Berlin, Germany & Online",
    date: "September 18, 2026",
    time: "02:00 PM CEST",
  },
];
