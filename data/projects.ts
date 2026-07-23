export type Project = {
  id: string;
  title: string;
  category: string;
  format?: "vertical" | "widescreen";
  year: string;
  description: string;
  role: string;
  tools: string[];
  outcome: string;
  thumbnail: string;
  previewVideo?: string;
  fullVideo?: string;
  youtubeId?: string;
  youtubeStart?: number;
  accent: string;
};

export const siteConfig = {
  // Replace these identity details with your own.
  name: "Thirdy",
  role: "Video Editor",
  statement: "Story-driven cuts for brands and film.",
  email: "hello@thirdy.studio",
  bio: "I shape raw footage into clear, emotionally precise stories. Every cut earns its place, every frame moves the story forward.",
  philosophy:
    "My process starts with feeling, then finds its rhythm—balancing performance, sound, motion, and color into work that stays with the audience.",
  socials: [
    { label: "Vimeo", href: "https://vimeo.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EDITING YOUR PROJECTS
// 1. Replace `thumbnail` with a 16:9 image URL or a file in /public.
// 2. Replace `previewVideo` with a short, compressed, muted MP4 loop.
// 3. Replace `fullVideo` with your final MP4, Vimeo, or YouTube-ready source.
// 4. Update the description, role, tools, and outcome text below.
// The remote files used now are public demo media and are safe to replace.
// ─────────────────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "short-form-01",
    // Replace this placeholder title and description with the real client/campaign.
    title: "Short-form Edit 01",
    category: "Social Video",
    format: "vertical",
    year: "2026",
    description:
      "A vertical social edit shaped for a fast hook, clear pacing, and mobile-first viewing.",
    role: "Video editor",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A concise 1:02 social cut designed to hold attention from the opening frame.",
    thumbnail:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=88",
    previewVideo: "/videos/short-form-01.mp4",
    fullVideo: "/videos/short-form-01.mp4",
    accent: "#ce532f",
  },
  {
    id: "short-form-02",
    // Replace this placeholder title and description with the real client/campaign.
    title: "Short-form Edit 02",
    category: "Social Video",
    format: "vertical",
    year: "2025",
    description:
      "A mobile-first edit balancing quick visual changes with a clean, readable story.",
    role: "Video editor",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A focused 1:09 vertical cut prepared for social distribution.",
    thumbnail:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=88",
    previewVideo: "/videos/short-form-02.mp4",
    fullVideo: "/videos/short-form-02.mp4",
    accent: "#695a8d",
  },
  {
    id: "short-form-03",
    // Replace this placeholder title and description with the real client/campaign.
    title: "Short-form Edit 03",
    category: "Vertical Story",
    format: "vertical",
    year: "2025",
    description:
      "A longer vertical story edited for sustained rhythm while keeping the frame active and direct.",
    role: "Video editor",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A 3:23 vertical piece with a clear progression and social-first presentation.",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1800&q=88",
    previewVideo: "/videos/short-form-03.mp4",
    fullVideo: "/videos/short-form-03.mp4",
    accent: "#256d73",
  },
  {
    id: "sales-call-breakdown",
    title: "Live Sales Call Breakdown",
    category: "Long-form",
    format: "widescreen",
    year: "2026",
    description:
      "A long-form educational breakdown edited to turn a live client conversation into a clear, engaging narrative.",
    role: "Long-form video editor",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "A structured YouTube edit balancing instruction, pacing, and viewer retention.",
    thumbnail: "https://i.ytimg.com/vi/LbEj4ohiEaQ/hqdefault.jpg",
    youtubeId: "LbEj4ohiEaQ",
    accent: "#ad772f",
  },
  {
    id: "ai-system",
    title: "Simple AI System",
    category: "Long-form",
    format: "widescreen",
    year: "2026",
    description:
      "A practical YouTube explainer shaped around clarity, forward momentum, and an accessible visual rhythm.",
    role: "Long-form video editor",
    tools: ["Premiere Pro", "After Effects"],
    outcome: "An information-dense edit designed to keep the presentation direct and watchable.",
    thumbnail: "https://i.ytimg.com/vi/YpotNywZjxM/hqdefault.jpg",
    youtubeId: "YpotNywZjxM",
    youtubeStart: 14,
    accent: "#3277a8",
  },
  {
    id: "julyna",
    title: "JULYNA",
    category: "Long-form",
    format: "widescreen",
    year: "2026",
    description:
      "A complete long-form piece edited with patient pacing, visual continuity, and a cinematic widescreen presentation.",
    role: "Long-form video editor",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    outcome: "A polished 16:58 narrative delivered as a complete YouTube feature.",
    thumbnail: "https://i.ytimg.com/vi/aEf0zjhM4Vg/hqdefault.jpg",
    youtubeId: "aEf0zjhM4Vg",
    accent: "#6b4d8a",
  },
];

export const tools = [
  "Premiere Pro",
  "DaVinci Resolve",
  "After Effects",
  "Audition",
  "Photoshop",
];

export const skills = [
  "Story editing",
  "Color grading",
  "Motion graphics",
  "Sound design",
];

export const reel = {
  video:
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  poster:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2200&q=90",
};
