import type { NextConfig } from "next";

// STATIC_EXPORT=1 next build  ->  emits a fully static `out/` folder
// (used for quick client-demo hosting; leaves `next dev` / `next start` untouched)
const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT === "1"
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
