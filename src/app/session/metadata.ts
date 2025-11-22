import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Session - Motion Generator & Debate Guide',
  description: 'Random motion generator for debate practice with comprehensive guides on British and Asian Parliamentary formats, motion types (THW, THBT, THR), and debate strategies.',
  path: '/session',
  keywords: [
    'debate motion generator',
    'random debate topics',
    'parliamentary debate guide',
    'THBT motions',
    'THW motions',
    'debate practice',
    'motion analysis',
    'debate formats',
  ],
});
