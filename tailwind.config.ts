import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}", "./@/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontSize: {
                /* -------------------------------- Overrides ------------------------------- */
                xs: "var(--fs--2)",
            },
            colors: {
                border: "hsl(var(--tw-color-gray))",
                input: "hsl(var(--tw-color-gray))",
                ring: "hsl(var(--tw-color-primary-800))",
                background: "hsl(var(--tw-color-background))",
                foreground: "hsl(var(--tw-color-text))",
                primary: {
                    DEFAULT: "hsl(var(--tw-color-primary-700))",
                    foreground: "hsl(var(--tw-color-primary-50))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--tw-color-success))",
                    foreground: "hsl(var(--tw-color-primary-700))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--tw-color-failure))",
                    foreground: "hsl(var(--tw-color-primary-50))",
                },
                muted: {
                    DEFAULT: "hsl(var(--tw-color-black-50))",
                    foreground: "hsl(var(--tw-color-black-50))",
                },
                accent: {
                    DEFAULT: "hsl(var(--tw-color-success))",
                    foreground: "hsl(var(--tw-color-primary-700))",
                },
                popover: {
                    DEFAULT: "hsl(var(--tw-color-background))",
                    foreground: "hsl(var(--tw-color-primary-800))",
                },
                card: {
                    DEFAULT: "hsl(var(--tw-color-background)",
                    foreground: "hsl(var(--tw-color-primary-800))",
                },
            },
            borderRadius: {
                lg: "var(--tw-radius)",
                md: "calc(var(--tw-radius) - 2px)",
                sm: "calc(var(--tw-radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            transitionTimingFunction: {
                ease: "cubic-bezier(0.76, 0, 0.24, 1)",
                "ease-in": "cubic-bezier(0.76, 0, 0.24, 1)",
                "ease-out": "cubic-bezier(0.76, 0, 0.24, 1)",
                "ease-in-out": "cubic-bezier(0.76, 0, 0.24, 1)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
