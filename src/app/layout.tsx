import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlgoPath | Interview practice, with purpose",
  description: "Build your interview skills with thoughtful DSA, SQL, and system design practice.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
