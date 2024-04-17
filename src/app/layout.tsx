import "~/styles/globals.scss";

import { Playfair_Display, Cinzel, Roboto_Serif, Playfair_Display_SC, Cinzel_Decorative } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./Providers";
import { Toaster } from "~/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { duration } from "../utils/animations";

const roboto = Roboto_Serif({
    subsets: ["latin"],
    variable: "--font-roboto",
});

const playfair_Display = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair_display",
});

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
});

const cinzelDecorative = Cinzel_Decorative({
    weight: "700",
    subsets: ["latin"],
    variable: "--font-cinzel-decorative",
});

const playfair_Display_SC_400 = Playfair_Display_SC({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-playfair_display_SC_400",
});
const playfair_Display_SC_700 = Playfair_Display_SC({
    weight: "700",
    subsets: ["latin"],
    variable: "--font-playfair_display_SC_700",
});

export const metadata = {
    title: "Scripr",
    description: "Finance management application",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${playfair_Display.variable} ${playfair_Display_SC_400.variable} ${playfair_Display_SC_700.variable} ${cinzel.variable} ${roboto.variable} ${cinzelDecorative.variable} `}
            >
                <Providers>
                    <NextTopLoader
                        zIndex={1000}
                        speed={700}
                        easing="cubic-bezier(0.76, 0, 0.24, 1)"
                        color="var(--color-success)"
                        showSpinner={false}
                    />
                    <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
