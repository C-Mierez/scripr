import { auth } from "~/server/auth";

export default async function Dashboard() {
    const session = await auth();
    return (
        <main
            style={{ padding: "var(--padding-side)", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            {JSON.stringify(session)}
        </main>
    );
}
