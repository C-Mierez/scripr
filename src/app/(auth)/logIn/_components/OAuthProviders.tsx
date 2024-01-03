"use client";

import { Button } from "@/components/ui/button";
import { logInOAuth } from "actions/auth";
import { useTransition } from "react";
import { CurrentOAuthProviders } from "~/server/auth.config";

export default function OAuthProvider() {
    const [isPending, startTransition] = useTransition();

    const providers: { provider: CurrentOAuthProviders; label: string }[] = [
        {
            provider: "google",
            label: "Google",
        },
        {
            provider: "github",
            label: "GitHub",
        },
    ];

    return (
        <ul className={"grid grid-cols-2 gap-[var(--padding-items)] w-full mt-[var(--padding-items)]"}>
            {providers.map(({ provider, label }) => (
                <li key={provider}>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            startTransition(() => {
                                logInOAuth(provider);
                            });
                        }}
                        disabled={isPending}
                    >
                        {label}
                    </Button>
                </li>
            ))}
        </ul>
    );
}
