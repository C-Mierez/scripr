"use client";

import useSessionUser from "~/hooks/useSessionUser";

export default function Dashboard() {
    const user = useSessionUser();

    return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4 text-center min-h-screen overflow-hidden">
            {JSON.stringify(user)}
        </main>
    );
}
