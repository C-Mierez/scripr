import "~/styles/globals.scss";

import { Inconsolata, Cinzel, Roboto_Serif, Archivo } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

const roboto = Roboto_Serif({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-roboto",
});

const inconsolata = Inconsolata({
    subsets: ["latin"],
    variable: "--font-inconsolata",
});

const cinzel = Cinzel({
    subsets: ["latin"],
    variable: "--font-cinzel",
});

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const metadata = {
    title: "Scripr",
    description: "Finance management application",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inconsolata.variable} ${archivo.variable} ${cinzel.variable} ${roboto.variable}`}>
                <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
