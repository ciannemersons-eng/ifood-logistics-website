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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
