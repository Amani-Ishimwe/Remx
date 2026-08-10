import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        remx: {
          black: "#0A0A0A",
          white: "#FFFFFF",
          "gray-light": "#F2F2F0",
          100: "#F2F2F0",
          200: "#E4E4E1",
          300: "#D1D1CD",
          400: "#A8A8A3",
          500: "#878782",
          600: "#6B6B66",
          700: "#454542",
          800: "#262624",
          900: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: ["var(--font-epilogue)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        tight: "-0.01em",
        label: "0.04em",
      },
      borderRadius: {
        lg: "10px",
        xl: "14px",
        "2xl": "18px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-4px)" },
          "40%, 80%": { transform: "translateX(4px)" },
        },
        pulseOutline: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.98)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        shake: "shake 0.4s ease-in-out",
        pulseOutline: "pulseOutline 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
