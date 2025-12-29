import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};

export default config;
