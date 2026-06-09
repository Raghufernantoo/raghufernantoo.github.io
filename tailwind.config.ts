import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./preview/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F8F7F2",
        ink: "#0C0C0D",
        muted: "#73736F",
        line: "#E1DFD8",
        orange: "#FF4B1F"
      },
      fontFamily: {
        sans: ["Poppins", "Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        soft: "0 28px 70px rgba(12, 12, 13, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
