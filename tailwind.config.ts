import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/emails/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ifood: {
          darkBlue: "#042B65",
          lightBlue: "#99E2FE",
          mediumBlue: "#2095CB",
          royalBlue: "#00459F",
          white: "#FFFFFF",
          black: "#1F1D1D",
          gray: "#515151",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
        body: ["Aptos", "Segoe UI", "Arial", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(4, 43, 101, 0.08)",
        card: "0 4px 16px rgba(4, 43, 101, 0.06)",
      },
      borderRadius: {
        card: "14px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "hero-zoom": {
          "0%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
        "card-in": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(220px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "hero-zoom": "hero-zoom 12s ease-out both",
        "card-in": "card-in 0.5s ease-out both",
        "slide-in-right": "slide-in-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
