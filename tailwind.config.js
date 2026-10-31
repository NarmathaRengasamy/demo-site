/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0C0B12",
        "ink-1": "#100E18",
        "ink-2": "#16131F",
        "ink-3": "#1E1A29",
        "ink-4": "#251F33",
        t1: "#F7F5F0",
        t2: "rgba(247, 245, 240, 0.66)",
        t3: "rgba(247, 245, 240, 0.40)",
        from: "#FF8A2B",
        to: "#FF3D6E",
        accent: "#FF6A2C",
        spark: "#6B4BFF",
        success: "#46D17F",
        line: "rgba(247, 245, 240, 0.10)",
        "line-2": "rgba(247, 245, 240, 0.06)",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        pill: "9999px",
        card: "20px",
        cta: "28px",
        console: "18px",
      },
      boxShadow: {
        'ember-sm': '0 8px 30px -8px rgba(255, 80, 60, 0.6)',
        'ember-lg': '0 24px 60px -30px rgba(255, 80, 60, 0.5)',
        'console': '0 50px 130px -50px rgba(0, 0, 0, 0.9), 0 30px 80px -40px rgba(255, 80, 60, 0.25)',
      }
    },
  },
  plugins: [],
};
