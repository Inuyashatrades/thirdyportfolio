import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thirdyrazon.com"),
  title: "Thirdy Razon — Strategic Video Editor",
  description:
    "Strategic video editor for short-form, long-form, and story-driven content.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Thirdy Razon — Strategic Video Editor",
    description: "Your search for a video editor ends here.",
    url: "https://thirdyrazon.com",
    siteName: "Thirdy Razon",
    type: "website",
  },
  alternates: { canonical: "https://thirdyrazon.com" },
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
