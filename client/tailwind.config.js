/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#22d3ee",
                secondary: "#818cf8",
                accent: "#3b82f6",
                background: {
                    light: "#f8fafc",
                    dark: "#0f172a",
                },
                text: {
                    light: "#e2e8f0",
                    dark: "#94a3b8",
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
    darkMode: 'class',
}
