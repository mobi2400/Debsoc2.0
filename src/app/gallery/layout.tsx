import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | SMVIT DEBSOC',
  description: 'Explore our gallery showcasing SMVIT DEBSOC events, debate competitions, team moments, and memorable achievements from our debating journey.',
  keywords: ['SMVIT DEBSOC gallery', 'debate society events', 'debate competition photos', 'SMVIT club events', 'debating society memories'],
  openGraph: {
    title: 'Gallery - SMVIT DEBSOC',
    description: 'Events and memories from SMVIT Debating Society',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
