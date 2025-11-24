import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debate Timer | SMVIT DEBSOC',
  description: 'Professional debate timer for British Parliamentary and Asian Parliamentary formats. Features customizable timing for speeches, POIs, and protected time.',
  keywords: ['debate timer', 'parliamentary debate timer', 'British parliamentary timer', 'Asian parliamentary timer', 'debate stopwatch', 'debate practice tool', 'speech timer'],
  openGraph: {
    title: 'Debate Timer - SMVIT DEBSOC',
    description: 'Professional debate timer for British and Asian Parliamentary debate formats',
  },
};

export default function DebateTimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
