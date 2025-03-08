import type { NextConfig } from "next";
import { paths } from "./constants/paths";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: paths.private.home,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
