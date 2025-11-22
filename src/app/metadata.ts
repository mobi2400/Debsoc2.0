import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Home - SMVIT DEBSOC',
  description: 'Welcome to SMVIT Debating Society - Where arguments meet artistry. Join us for structured debates, competitive training, and intellectual discourse.',
  path: '/',
  keywords: [
    'SMVIT Debate Society home',
    'debate club Bangalore',
    'parliamentary debate training',
    'public speaking society',
    'SMVIT DEBSOC',
    'debate competitions',
    'critical thinking club',
  ],
});
