"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export default function LoginButton({ children, mode = "redirect", asChild }: LoginButtonProps) {
    const router = useRouter();

    const onClick = () => {
        router.push("/logIn");
    };

    if (mode === "modal") {
        return <div>Modal not implemented</div>;
    }

    return <span onClick={onClick}>{children}</span>;
}
