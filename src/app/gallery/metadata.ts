import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Gallery - Events & Memories',
  description: 'Explore our gallery showcasing SMVIT DEBSOC events, debate competitions, team moments, and memorable achievements from our debating journey.',
  path: '/gallery',
  keywords: [
    'SMVIT DEBSOC gallery',
    'debate society events',
    'debate competition photos',
    'SMVIT club events',
    'debating society memories',
  ],
});
