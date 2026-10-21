export type Project = {
  id: string;
  title: string;
  category: string;
  format: "short-form" | "long-form";
  hideCategory?: boolean;
  // Use the video's real frame ratio. Supported values automatically control
  // both the work grid and the expanded video player.
  aspectRatio: "9:16" | "4:3" | "16:9";
  year: string;
  description: string;
  role: string;
  tools: string[];
  outcome: string;
  analytics?: {
    views: string;
    reactions?: string;
    shares?: string;
    platform?: string;
  };
  previewVideo?: string;
  // A frame exported from the same video, shown only while mobile Safari loads
  // or when autoplay is disabled (for example, in Low Power Mode).
  previewPoster?: string;
  fullVideo?: string;
  youtubeId?: string;
  youtubeStart?: number;
  accent: string;
};

export const siteConfig = {
  // Replace contact and social links below with your live accounts.
  name: "Thirdy Razon",
  role: "Video Specialist & Creative Partner",
  statement: "Your search for a video specialist ends here. Hire someone who thinks strategically, not just executes.",
  email: "hello@thirdyrazon.com",
  socials: [
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EDITING YOUR PROJECTS
// 1. Set `aspectRatio` to the video's real shape: "9:16", "4:3", or "16:9".
// 2. Replace `previewVideo` with a short, compressed, muted MP4 loop.
// 3. Replace `fullVideo` with your final MP4, or use `youtubeId` for YouTube.
// 4. Update the description, role, tools, and outcome text below.
// No separate cover photos are used: the videos provide their own frames.
// ─────────────────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "short-form-01",
    // Replace this placeholder title and description with the real client/campaign.
    title: "Facebook Reel",
    category: "Facebook Reel",
    format: "short-form",
    hideCategory: true,
    aspectRatio: "9:16",
    year: "2024",
    description:
      "A vertical social edit shaped for a fast hook, clear pacing, and mobile-first viewing.",
    role: "Video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A concise 1:02 social cut designed to hold attention from the opening frame.",
    analytics: { views: "71K", reactions: "1.7K", shares: "274" },
    previewVideo: "/videos/short-form-01.mp4?v=2",
    previewPoster: "/videos/short-form-01-frame.jpg",
    fullVideo: "/videos/short-form-01.mp4?v=2",
    accent: "#ce532f",
  },
  {
    id: "short-form-02",
    // Replace this placeholder title and description with the real client/campaign.
    title: "Facebook Reel",
    category: "Facebook Reel",
    format: "short-form",
    hideCategory: true,
    aspectRatio: "9:16",
    year: "2024",
    description:
      "A mobile-first edit balancing quick visual changes with a clean, readable story.",
    role: "Video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A focused 1:09 vertical cut prepared for social distribution.",
    analytics: { views: "140K", reactions: "4.1K", shares: "502" },
    previewVideo: "/videos/short-form-02.mp4?v=2",
    previewPoster: "/videos/short-form-02-frame.jpg",
    fullVideo: "/videos/short-form-02.mp4?v=2",
    accent: "#695a8d",
  },
  {
    id: "short-form-03",
    // Replace this placeholder title and description with the real client/campaign.
    title: "Facebook Reel",
    category: "Facebook Reel",
    format: "short-form",
    hideCategory: true,
    aspectRatio: "9:16",
    year: "2025",
    description:
      "A longer vertical story edited for sustained rhythm while keeping the frame active and direct.",
    role: "Video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A 3:23 vertical piece with a clear progression and social-first presentation.",
    analytics: { views: "337K", reactions: "8.1K", shares: "1.4K" },
    previewVideo: "/videos/short-form-03.mp4?v=2",
    previewPoster: "/videos/short-form-03-frame.jpg",
    fullVideo: "/videos/short-form-03.mp4?v=2",
    accent: "#256d73",
  },
  {
    id: "highlevel-commercial",
    title: "HighLevel Commercial",
    category: "Commercial",
    format: "long-form",
    aspectRatio: "16:9",
    year: "2026",
    description:
      "A high-energy event commercial combining bold messaging, crowd momentum, and fast visual progression.",
    role: "Video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A cinematic 1:27 promotional edit built to communicate scale, energy, and urgency.",
    previewVideo: "/videos/commercial.mp4?v=1",
    previewPoster: "/videos/commercial-frame.jpg",
    fullVideo: "/videos/commercial.mp4?v=1",
    accent: "#cc2b77",
  },
  {
    id: "work-from-home-guide",
    title: "Your Guide to $1,500/Month WFH Jobs",
    category: "YouTube",
    format: "long-form",
    aspectRatio: "16:9",
    year: "2026",
    description:
      "A practical work-from-home guide edited for clarity, retention, and an accessible step-by-step flow.",
    role: "Long-form video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A focused YouTube edit that reached 28K views.",
    analytics: { views: "28K", platform: "YouTube" },
    youtubeId: "qa0pgGd-AVE",
    accent: "#c9402f",
  },
  {
    id: "wfh-websites-beginners",
    title: "5 WFH Websites for Beginners",
    category: "YouTube",
    format: "long-form",
    aspectRatio: "16:9",
    year: "2026",
    description:
      "A beginner-friendly YouTube feature structured around five actionable work-from-home resources.",
    role: "Long-form video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A clear, retention-focused edit that reached 15K views.",
    analytics: { views: "15K", platform: "YouTube" },
    youtubeId: "h7z9cIh9yeQ",
    accent: "#256d73",
  },
  {
    id: "sales-call-breakdown",
    title: "Live Sales Call Breakdown",
    category: "Long-form",
    format: "long-form",
    aspectRatio: "16:9",
    year: "2026",
    description:
      "A long-form educational breakdown edited to turn a live client conversation into a clear, engaging narrative.",
    role: "Long-form video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A structured YouTube edit balancing instruction, pacing, and viewer retention.",
    youtubeId: "LbEj4ohiEaQ",
    accent: "#ad772f",
  },
  {
    id: "ai-system",
    title: "Simple AI System",
    category: "Long-form",
    format: "long-form",
    aspectRatio: "16:9",
    year: "2026",
    description:
      "A practical YouTube explainer shaped around clarity, forward momentum, and an accessible visual rhythm.",
    role: "Long-form video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "An information-dense edit designed to keep the presentation direct and watchable.",
    youtubeId: "YpotNywZjxM",
    youtubeStart: 14,
    accent: "#3277a8",
  },
  {
    id: "julyna",
    title: "JULYNA",
    category: "Long-form",
    format: "long-form",
    aspectRatio: "16:9",
    year: "2026",
    description:
      "A complete long-form piece edited with patient pacing, visual continuity, and a cinematic widescreen presentation.",
    role: "Long-form video specialist",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    outcome: "A polished 16:58 narrative delivered as a complete YouTube feature.",
    youtubeId: "aEf0zjhM4Vg",
    accent: "#6b4d8a",
  },
  {
    id: "hla-testimonial-erieka",
    title: "HLA Student Testimonial — Erieka",
    category: "Testimonial",
    format: "short-form",
    aspectRatio: "9:16",
    year: "2026",
    description:
      "A concise student testimonial shaped around an authentic voice, readable captions, and a clear emotional takeaway.",
    role: "Video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A polished 20-second vertical testimonial prepared for social-first viewing.",
    previewVideo: "/videos/testimonial-01.mp4?v=1",
    previewPoster: "/videos/testimonial-01-frame.jpg",
    fullVideo: "/videos/testimonial-01.mp4?v=1",
    accent: "#3958d4",
  },
  {
    id: "hla-testimonial-laurice",
    title: "HLA Student Testimonial — Laurice",
    category: "Testimonial",
    format: "short-form",
    aspectRatio: "9:16",
    year: "2026",
    description:
      "A direct-to-camera testimonial refined with strong typography, focused pacing, and a consistent branded treatment.",
    role: "Video specialist",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A focused 22-second vertical testimonial designed for clear mobile communication.",
    previewVideo: "/videos/testimonial-02.mp4?v=1",
    previewPoster: "/videos/testimonial-02-frame.jpg",
    fullVideo: "/videos/testimonial-02.mp4?v=1",
    accent: "#293a88",
  },
];

export const services = [
  {
    title: "Long-form Video",
    description: "Structured edits built for clarity, retention, and story.",
    mark: "16:9",
    color: "purple",
  },
  {
    title: "Short-form Video",
    description: "Fast, platform-native cuts designed to stop the scroll.",
    mark: "9:16",
    color: "lime",
  },
  {
    title: "AI Animation",
    description: "Stylized AI-assisted motion that turns ideas into vivid visuals.",
    mark: "AI",
    color: "pink",
  },
  {
    title: "AI UGC Videos",
    description: "Scalable creator-style videos for campaigns, products, and brands.",
    mark: "UGC",
    color: "green",
  },
];

export const reel = {
  video:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  poster:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=90",
};
