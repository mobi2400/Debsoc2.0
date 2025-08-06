// Gallery data structure
export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description: string;
}

export interface GalleryEvent {
  eventName: string;
  images: GalleryImage[];
}

// Sample gallery data - replace with your actual event data
export const galleryEvents: GalleryEvent[] = [
  {
    eventName: "DPL",
    images: [
      {
        id: 1,
        src: "/gallery/dpl/image1.jpg",
        alt: "DPL Championship 2024",
        description: "Intense debate moments from our annual DPL championship",
      },
      {
        id: 2,
        src: "/gallery/dpl/image2.jpg",
        alt: "DPL Participants",
        description: "Talented participants showcasing their debating skills",
      },
      {
        id: 3,
        src: "/gallery/dpl/image3.jpg",
        alt: "DPL Winner",
        description:
          "Celebrating our champions and their outstanding performance",
      },
      // Add more DPL images here
    ],
  },
  {
    eventName: "Merch",
    images: [
      {
        id: 11,
        src: "/gallery/merch/tshirt1.jpg",
        alt: "SMVIT DEBSOC T-Shirt",
        description: "Official SMVIT DEBSOC branded t-shirts in various colors",
      },
      {
        id: 12,
        src: "/gallery/merch/hoodie1.jpg",
        alt: "DEBSOC Hoodie",
        description: "Premium quality hoodies with embroidered logo",
      },
      {
        id: 13,
        src: "/gallery/merch/accessories.jpg",
        alt: "DEBSOC Accessories",
        description: "Badges, stickers, and other branded accessories",
      },
      // Add more Merch images here
    ],
  },
  {
    eventName: "Workshops",
    images: [
      {
        id: 21,
        src: "/gallery/workshops/session1.jpg",
        alt: "Public Speaking Workshop",
        description: "Interactive sessions on improving public speaking skills",
      },
      {
        id: 22,
        src: "/gallery/workshops/training.jpg",
        alt: "Debate Training",
        description:
          "Comprehensive debate training for beginners and advanced speakers",
      },
      {
        id: 23,
        src: "/gallery/workshops/group.jpg",
        alt: "Workshop Group Photo",
        description: "Participants and trainers at our monthly workshop",
      },
      // Add more Workshop images here
    ],
  },
  {
    eventName: "Events",
    images: [
      {
        id: 31,
        src: "/gallery/events/inauguration.jpg",
        alt: "Event Inauguration",
        description:
          "Grand inauguration ceremony of our annual debate festival",
      },
      {
        id: 32,
        src: "/gallery/events/competition.jpg",
        alt: "Inter-College Competition",
        description: "Fierce competition between top colleges in the region",
      },
      {
        id: 33,
        src: "/gallery/events/award.jpg",
        alt: "Award Ceremony",
        description: "Recognizing excellence in debate and public speaking",
      },
      // Add more Event images here
    ],
  },
  {
    eventName: "Team Moments",
    images: [
      {
        id: 41,
        src: "/gallery/team/meeting.jpg",
        alt: "Team Meeting",
        description: "Strategic planning session with our core team members",
      },
      {
        id: 42,
        src: "/gallery/team/celebration.jpg",
        alt: "Team Celebration",
        description: "Celebrating our achievements and milestones together",
      },
      {
        id: 43,
        src: "/gallery/team/outing.jpg",
        alt: "Team Outing",
        description: "Fun team building activities and bonding sessions",
      },
      // Add more Team images here
    ],
  },
];

export default galleryEvents;
