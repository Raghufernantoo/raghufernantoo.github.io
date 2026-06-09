import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raghu - UI/UX Designer",
  description: "Lead UX Designer portfolio for product design, UX strategy, and digital experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
