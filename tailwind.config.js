/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBlue: "#2874f0",
                primaryGreen: "#388e3c",
                orange: "#fb641b",
                primaryBg: "#f1f3f6",
                textHover: "#666666",
                
                cream: {
                    DEFAULT: "#f8f5f1",
          light: "#fdfaf6",
          dark: "#e9e4da",

                },
               gray: {
          950: "#18181b",
          900: "#232326",
          800: "#2d2d31",
          700: "#3d3d42",
          400: "#a1a1aa",
          200: "#e5e7eb",
        },

            },
            boxShadow: {
                primaryShadow: "0px_0px_8px_2px_rgba(212,212,212,0.6)",
            },

        },
    },
    plugins: [],
};
