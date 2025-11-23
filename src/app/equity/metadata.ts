import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Equity Policy - Safe & Inclusive Debating',
  description: 'SMVIT DEBSOC Equity Policy ensuring a respectful, inclusive, and safe environment for all members. Learn about our commitment to equitable debating.',
  path: '/equity',
  keywords: [
    'equity policy',
    'debate society equity',
    'inclusive debating',
    'safe debate environment',
    'harassment policy',
    'debate ethics',
    'SMVIT DEBSOC equity',
  ],
});
