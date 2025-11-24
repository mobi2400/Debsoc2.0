import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equity Policy | SMVIT DEBSOC',
  description: 'SMVIT DEBSOC Equity Policy ensuring a respectful, inclusive, and safe environment for all members. Learn about our commitment to equitable debating.',
  keywords: ['equity policy', 'debate society equity', 'inclusive debating', 'safe debate environment', 'harassment policy', 'debate ethics', 'SMVIT DEBSOC equity'],
  openGraph: {
    title: 'Equity Policy - SMVIT DEBSOC',
    description: 'Ensuring a safe and inclusive environment for all debaters',
  },
};

export default function EquityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
