/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,vue}"],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3570c4",

          secondary: "#e8c95c",

          accent: "#dce835",

          neutral: "#fafafa",

          "base-100": "#09090b",

          info: "#4585c4",

          success: "#60e19c",

          warning: "#ec8f0e",

          error: "#e65d5b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
