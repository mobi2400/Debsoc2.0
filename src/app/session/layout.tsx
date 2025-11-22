import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Session - Motion Generator | SMVIT DEBSOC',
  description: 'Random motion generator for debate practice with comprehensive guides on British and Asian Parliamentary formats, motion types (THW, THBT, THR), and debate strategies.',
  keywords: ['debate motion generator', 'random debate topics', 'parliamentary debate guide', 'THBT motions', 'THW motions', 'debate practice', 'motion analysis', 'debate formats'],
  openGraph: {
    title: 'Session & Motion Generator - SMVIT DEBSOC',
    description: 'Practice debates with random motion generator and comprehensive debate guides',
  },
};

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
