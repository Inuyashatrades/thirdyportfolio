import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thirdy — Video Editor",
  description:
    "Video editor crafting story-driven films, brand work, and motion.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Thirdy — Video Editor",
    description: "Stories live in the cut.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
