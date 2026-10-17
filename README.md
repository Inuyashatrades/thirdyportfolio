# Thirdy — Video Specialist Portfolio

A cinematic, single-page portfolio built with Next.js, TypeScript, Tailwind CSS,
and Framer Motion. Project content is centralized so the work can be updated
without changing the page layout.

## Run locally

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal. For a production check:

```bash
npm run build
```

## Add or edit work

Open `data/projects.ts`.

- Change `siteConfig` to update the name, role, bio, email, and social links.
- Edit the `projects` array to change titles, descriptions, roles, tools, and
  outcomes.
- Set `aspectRatio` to `"9:16"`, `"4:3"`, or `"16:9"` so every project keeps
  its real video shape in both the grid and expanded player.
- Replace `previewVideo` and `fullVideo` with your own hosted files or paths to
  assets placed in `public`. Project cards use the video itself, not a separate
  cover image.
- For a YouTube project, use `youtubeId: "VIDEO_ID"` instead of `fullVideo`.
  The ID is the part after `v=` in a YouTube URL. Add `youtubeStart: 14` when
  the embedded video should begin 14 seconds in.
- Keep preview clips short and compressed. MP4/H.264 is the safest web format.
- Update `reel` at the bottom of the file with the final showreel and poster.

Each field includes a clear comment in the data file. The supplied remote video
files are placeholders only.

## Deploy to Vercel

Push the project to GitHub, import the repository at
[vercel.com/new](https://vercel.com/new), and accept the detected Next.js
settings. No environment variables are required. Future pushes to the connected
branch deploy automatically.
