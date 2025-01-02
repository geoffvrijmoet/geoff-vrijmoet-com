import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate"

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))"
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		},
  		fontFamily: {
  			sans: ['var(--font-sulphur-point)', 'sans-serif'],
  			heading: ['var(--font-sulphur-point)', 'sans-serif'],
  			mono: ["var(--font-geist-mono)"]
  		}
  	}
  },
  plugins: [animate],
};
export default config;
