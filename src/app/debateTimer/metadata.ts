import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Debate Timer - British & Asian Parliamentary',
  description: 'Professional debate timer for British Parliamentary and Asian Parliamentary formats. Features customizable timing for speeches, POIs, and protected time.',
  path: '/debateTimer',
  keywords: [
    'debate timer',
    'parliamentary debate timer',
    'British parliamentary timer',
    'Asian parliamentary timer',
    'debate stopwatch',
    'debate practice tool',
    'speech timer',
  ],
});
