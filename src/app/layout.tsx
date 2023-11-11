import "~/styles/globals.scss";

import { Playfair_Display, Cinzel, Roboto_Serif, Playfair_Display_SC, Cinzel_Decorative } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

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

const playfair_Display_SC_400 = Playfair_Display_SC({ weight: "400", subsets: ["latin"], variable: "--font-playfair_display_SC_400" });
const playfair_Display_SC_700 = Playfair_Display_SC({ weight: "700", subsets: ["latin"], variable: "--font-playfair_display_SC_700" });

export const metadata = {
    title: "Scripr",
    description: "Finance management application",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${playfair_Display.variable} ${playfair_Display_SC_400.variable} ${playfair_Display_SC_700.variable} ${cinzel.variable} ${roboto.variable} ${cinzelDecorative.variable} `}
            >
                <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
