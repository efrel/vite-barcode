/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        fontFamily: {
            sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        },
        extends: {
            colors: {
                navy: "364F6B",
            },
        },
    },
    plugins: [],
};
