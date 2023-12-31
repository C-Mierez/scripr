import { useSession } from "next-auth/react";

export default function useSessionUser() {
    const session = useSession();

    return session.data?.user;
}
