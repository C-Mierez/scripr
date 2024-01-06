import { auth } from "~/middleware";
import DashboardHeader from "./_components/DashboardHeader";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <DashboardHeader />
            {children}
        </SessionProvider>
    );
}
