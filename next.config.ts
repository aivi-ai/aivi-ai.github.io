import type { NextConfig } from "next";

// basePath is empty for the normal case: a repo named <org>.github.io serves
// at the root, https://<org>.github.io/. Only set NEXT_PUBLIC_BASE_PATH if
// this repo has some other name and GitHub serves it under a subpath, e.g.
// NEXT_PUBLIC_BASE_PATH=/docs for <org>.github.io/docs/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Markdown resources live in content/ and are rendered to HTML at build
  // time via `marked` (see lib/resources.ts) — no MDX pipeline needed.
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // Static export: every route becomes a pre-rendered HTML file in ./out,
  // served directly by GitHub Pages (no Node server).
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
