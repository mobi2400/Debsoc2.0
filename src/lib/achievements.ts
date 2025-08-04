// For Next.js, images in public folder should be referenced as strings
const AcvAditya = "/media/AcvAditya.jpg";
const AcvAnanya = "/media/AcvAnanya.jpg";
const AcvPrachi = "/media/AcvPrachi.jpg";
const AcvRohan = "/media/AcvRohan.jpg";
const AcvAnuj = "/media/AcvAnuj.jpg";
const AcvOwais = "/media/AcvOwais.jpg";
const AcvPrachiNmit = "/media/AcvPrachiNmit.jpg";
const AcvSrejoniRohan = "/media/AcvSrejoniRohan.jpg";
const AcvPuru = "/media/AcvPuru.jpg";

interface Achievement {
  img: string;
  title: string;
  desc: string;
}

const achievements: Achievement[] = [
  {
    img: AcvSrejoniRohan,
    title:
      "Rohan and Srejoni broke into the Open Category and advanced to the Semifinals at the BITS Goa Contention PD'24",
    desc: "We have all been eagerly awaiting this moment for the past couple of years, and we are absolutely thrilled and proud to announce that Rohan and Srejoni broke into the Open Category and advanced to the Semifinals at the BITS Goa Contention PD'24, held from 8th to 10th of November at BITS Goa Campus. This remarkable achievement is a testament to their relentless hard work and dedication.Our contingent from SMVIT Debsoc consisted of 13 participants who gave their very best throughout the tournament.Congratulations once again to everyone involved!",
  },
  {
    img: AcvPuru,
    title:
      "Our President kicked off Diwali celebrations with a bang by securing an “Adj break“at the prestigious IIT Kanpur PD!",
    desc: "Our President kicked off Diwali celebrations with a bang by securing an “Adj break“at the prestigious IIT Kanpur PD!He went on to panel in the Open Semi Finals, with a team cap of 76, the event was held in online mode from October 26th to 28th.Under his stellar leadership, we’ve achieved a milestone that’s lighting up our entire society and college! This break on such a grand stage is nothing short of a Diwali spark for future victories!Congratulations to our President on this achievement, and here’s to many more!Let this moment shine like a Diwali diya guiding us toward greater heights!",
  },
  {
    img: AcvAnuj,
    title:
      "SMVIT DEBSOC proudly congratulates Anuj Kumar Dixit on an outstanding achievement at LA Vida 2024, hosted by the Rivers State University Debate Society, Port Harcourt, Nigeria!",
    desc: "From First Steps to Big Breaks SMVIT DEBSOC proudly congratulates Anuj Kumar Dixit on an outstanding achievement at LA Vida 2024, hosted by the Rivers State University Debate Society, Port Harcourt, Nigeria! Out of 73 teams, Anuj made an impressive breakthrough, advancing all the way to the Novice Quarterfinals—an exceptional feat for someone just beginning their debating journey.This is just the beginning! Keep up the great work, Anuj—the sky’s thelimit!",
  },
  {
    img: AcvOwais,
    title:
      "A huge shoutout to Rohan Singh and Mohammed Owais, for their incredible performance at RCL PD'24, held at Ramaiah College of Law.",
    desc: "A huge shoutout to Rohan Singh and Mohammed Owais, for their incredible performance at RCL PD'24, held at Ramaiah College of Law.Competing in the Novice category, they battled it out among 57 teams, securing 5th place and just missing the break by a whisker.Their dedication and passion have made us all proud. The next break is yours for the taking!Ready to conquer bigger stages and bring home more wins.",
  },
  {
    img: AcvAnanya,
    title:
      "Huge Congratulations to Aditya, Ananya, and Prachi for breaking as adjudicators in the OCTO FINALS! ",
    desc: "Our dynamic Debate Society absolutely soared at the Agonia 3.O- The Reckoning'24 an online British Parliamentary tournament held a few weeks back!With 128 teams competing fiercely, we made it to the OCTO FINALS!Huge Congratulations to Aditya, Ananya, and Prachi for breaking as adjudicators in the OCTO FINALS! Special Shoutout to our First-Year Stars:Ananya and Prachi who rocked the tournament. Their exceptional performance in their very first tournament was commendable.We are so proud of each of them!Here's to many more debates, victories, and shining moments ",
  },
];

export default achievements;
export type {Achievement};
