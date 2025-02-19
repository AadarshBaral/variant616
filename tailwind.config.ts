import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#141A13",
        foreground: "#D6AE2F",
      },
      transitionTimingFunction: {
        "minor-spring": "cubic-bezier(0.18,0.89,0.82,1.04)",
      },
      keyframes: {
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "reveal-down": {
          "0%": { opacity: "0", transform: "translateY(-80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "content-blur": {
          "0%": { filter: "blur(0.3rem)" },
          "100%": { filter: "blur(0)" },
        },
        bloop: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%": { transform: "scale(1.5)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        bloop: "bloop 0.5s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
