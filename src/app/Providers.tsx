"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <ReactLenis
                root={true}
                options={{
                    lerp: 0.08,
                    touchMultiplier: 0.05,
                }}
            >
                {children}
            </ReactLenis>
        </ThemeProvider>
    );
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
            {children}
        </NextThemesProvider>
    );
}
