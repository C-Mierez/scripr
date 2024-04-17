"use client";

import { cn } from "~/lib/utils";
import { CheckCircledIcon, ClipboardIcon } from "@radix-ui/react-icons";
import { VariantProps } from "class-variance-authority";
import React, { useState } from "react";

import { ButtonProps, buttonVariants } from "../ui/button";

export interface ClipboardPasteProps extends ButtonProps, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    callback: (clipboardValue: string) => Promise<void>;
}

const ClipboardPaste = React.forwardRef<HTMLButtonElement, ClipboardPasteProps>(
    ({ className, variant = "link", size, callback, ...props }, ref) => {
        const [isPending, setIsPending] = useState(false);
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }), "gap-1")}
                ref={ref}
                {...props}
                disabled={isPending}
                onClick={() => {
                    setIsPending(true);
                    navigator.clipboard.readText().then((text) => {
                        callback(text).finally(() => {
                            setTimeout(() => {
                                setIsPending(false);
                            }, 1500);
                        });
                    });
                }}
            >
                {isPending ? (
                    <>
                        <CheckCircledIcon color="var(--color-black-50)" className="h-4 w-4" />
                        <p className="text-muted">Pasted!</p>
                    </>
                ) : (
                    <>
                        <ClipboardIcon color="var(--color-black-50)" className="h-4 w-4" />
                        <p className="text-muted">Paste</p>
                    </>
                )}
            </button>
        );
    }
);
export default ClipboardPaste;
