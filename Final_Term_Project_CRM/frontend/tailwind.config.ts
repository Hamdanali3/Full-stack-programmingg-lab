import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202a",
        line: "#d9e2ec",
        brand: "#0f766e",
        accent: "#c2410c"
      }
    }
  },
  plugins: []
};

export default config;
