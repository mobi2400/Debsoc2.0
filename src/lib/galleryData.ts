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

const galleryEvents: GalleryEvent[] = [
  {
    eventName: "DPL",
    images: [
      {
        id: 1,
        src: "/GalleryPics/DPL2-1.jpg",
        alt: "DPL",
        description:
          "Intense debate competition showcasing brilliant arguments",
      },
      {
        id: 2,
        src: "/GalleryPics/DPL2-2.jpg",
        alt: "DPL",
        description:
          "Participants demonstrating exceptional public speaking skills",
      },
      {
        id: 3,
        src: "/GalleryPics/DPL3-1.jpg",
        alt: "DPL",
        description: "Grand opening of our prestigious debate league",
      },
      {
        id: 4,
        src: "/GalleryPics/DPL3-2.jpg",
        alt: "DPL",
        description: "Early rounds featuring emerging debate talents",
      },
      {
        id: 5,
        src: "/GalleryPics/DPL3-3.jpg",
        alt: "DPL",
        description: "Intense quarter-final matches with strategic arguments",
      },
      {
        id: 6,
        src: "/GalleryPics/DPL3-4.jpg",
        alt: "DPL",
        description: "Semi-final showdown between top contenders",
      },
      {
        id: 7,
        src: "/GalleryPics/DPL3-5.jpg",
        alt: "DPL",
        description: "Finalists preparing for the ultimate debate challenge",
      },
      {
        id: 8,
        src: "/GalleryPics/DPL3-6.jpg",
        alt: "DPL",
        description: "The epic final battle of words and wisdom",
      },
      {
        id: 9,
        src: "/GalleryPics/DPL3-7.jpg",
        alt: "DPL",
        description: "Celebrating the champions and outstanding performers",
      },
      {
        id: 10,
        src: "/GalleryPics/DPL3-8.jpg",
        alt: "DPL",
        description: "Our proud champions holding their well-deserved trophies",
      },
    ],
  },
  {
    eventName: "Farewell 2022",
    images: [
      {
        id: 11,
        src: "/GalleryPics/Farewell22-1.jpg",
        alt: "Farewell 2022",
        description: "Emotional farewell moments with seniors",
      },
      {
        id: 12,
        src: "/GalleryPics/Farewell22-2.jpg",
        alt: "Farewell 2022",
        description: "Group photo with graduating members",
      },
      {
        id: 13,
        src: "/GalleryPics/Farewell22-3.jpg",
        alt: "Farewell 2022",
        description: "Farewell ceremony highlights",
      },
      {
        id: 14,
        src: "/GalleryPics/Farewell22-4.jpg",
        alt: "Farewell 2022",
        description: "Team bonding during farewell event",
      },
      {
        id: 15,
        src: "/GalleryPics/Farewell22-5.jpg",
        alt: "Farewell 2022",
        description: "Final group celebration",
      },
    ],
  },
  {
    eventName: "Farewell 2023",
    images: [
      {
        id: 16,
        src: "/GalleryPics/Farewell23-1.JPG",
        alt: "Farewell 2023",
        description: "Beautiful opening moments of 2023 farewell",
      },
      {
        id: 17,
        src: "/GalleryPics/Farewell23-2.JPG",
        alt: "Farewell 2023",
        description: "Heartfelt speeches from graduating seniors",
      },
      {
        id: 18,
        src: "/GalleryPics/Farewell23-3.JPG",
        alt: "Farewell 2023",
        description: "Walking down memory lane with cherished moments",
      },
      {
        id: 19,
        src: "/GalleryPics/Farewell23-4.JPG",
        alt: "Farewell 2023",
        description: "Joyful group celebrations and bonding",
      },
      {
        id: 20,
        src: "/GalleryPics/Farewell23-5.JPG",
        alt: "Farewell 2023",
        description: "Special awards and recognition ceremony",
      },
      {
        id: 21,
        src: "/GalleryPics/Farewell23-6.JPG",
        alt: "Farewell 2023",
        description: "Final group photo marking the end of an era",
      },
    ],
  },
  {
    eventName: "Team Moments",
    images: [
      {
        id: 22,
        src: "/GalleryPics/M1.jpg",
        alt: "Team Moments",
        description: "Fun team bonding activities and games",
      },
      {
        id: 23,
        src: "/GalleryPics/M2.jpg",
        alt: "Team Moments",
        description: "Relaxed moments with team members",
      },
      {
        id: 24,
        src: "/GalleryPics/M3.jpg",
        alt: "Team Moments",
        description: "Collaborative learning and skill development",
      },
      {
        id: 25,
        src: "/GalleryPics/M4.jpg",
        alt: "Team Moments",
        description: "Celebrating achievements and milestones together",
      },
      {
        id: 26,
        src: "/GalleryPics/M5.jpg",
        alt: "Team Moments",
        description: "Memorable team outing and adventure",
      },
      {
        id: 27,
        src: "/GalleryPics/M6.jpg",
        alt: "Team Moments",
        description: "Showcasing the strong bond of our debate family",
      },
    ],
  },
  {
    eventName: "Recruitment & Training 2023",
    images: [
      {
        id: 28,
        src: "/GalleryPics/RclPd23-1.jpg",
        alt: "Recruitment & Training 2023",
        description: "Active recruitment campaign for new members",
      },
      {
        id: 29,
        src: "/GalleryPics/RclPd23-2.jpg",
        alt: "Recruitment & Training 2023",
        description: "Fundamental training session for newcomers",
      },
      {
        id: 30,
        src: "/GalleryPics/RclPd23-3.jpg",
        alt: "Recruitment & Training 2023",
        description: "Advanced techniques and strategies workshop",
      },
      {
        id: 31,
        src: "/GalleryPics/RclPd23-4.jpg",
        alt: "Recruitment & Training 2023",
        description: "Practice debates to hone skills and confidence",
      },
      {
        id: 32,
        src: "/GalleryPics/RclPd23-5.jpg",
        alt: "Recruitment & Training 2023",
        description: "Welcoming our newest debate society members",
      },
    ],
  },
];

export default galleryEvents;
