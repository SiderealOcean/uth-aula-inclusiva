import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#1e40af",
          600: "#1e3d9c",
          700: "#1e3a8a",
          800: "#1a2f6f",
          900: "#172554",
        },
        surface: {
          light: "#ffffff",
          dark: "#0f172a",
        },
      },
      fontSize: {
        "pres-title": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        "pres-subtitle": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "pres-body": ["1.25rem", { lineHeight: "1.75rem" }],
      },
    },
  },
  plugins: [],
};
export default config;
