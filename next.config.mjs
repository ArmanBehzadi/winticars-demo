/**
 * Static-export config for the throwaway demo.
 * `output: export` → plain HTML/JS in `out/`, deployable on Cloudflare Pages
 * or GitHub Pages free tier (commercial use allowed — unlike Vercel Hobby).
 *
 * No server, no DB, no auth. Dynamic routes are pre-rendered at build time
 * from the fixture files via generateStaticParams().
 *
 * GitHub Pages note: a project site is served from /<repo>, so uncomment
 * basePath below and set it to the repo name. Cloudflare Pages serves from
 * root → leave basePath empty.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // basePath: "/winticars-demo",
};

export default nextConfig;
