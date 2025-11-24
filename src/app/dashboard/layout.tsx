import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "SMVIT DEBSOC - User Dashboard Portal",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

