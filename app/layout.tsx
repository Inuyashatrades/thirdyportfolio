import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thirdyrazon.com"),
  title: "Thirdy Razon — Strategic Video Specialist",
  description:
    "Strategic video specialist for short-form, long-form, and story-driven content.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Thirdy Razon — Strategic Video Specialist",
    description: "Your search for a video specialist ends here.",
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
