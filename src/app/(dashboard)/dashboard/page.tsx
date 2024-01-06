"use client";

import useSessionUser from "~/hooks/useSessionUser";

export default function Dashboard() {
    const user = useSessionUser();

    return (
        <main
            style={{ padding: "var(--padding-side)", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            {JSON.stringify(user)}
        </main>
    );
}
