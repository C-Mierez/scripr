"use client";

import FormAlertFailure from "~/components/FormAlertFailure";
import FormAlertSuccess from "~/components/FormAlertSuccess";
import SquareLoader from "~/components/loaders/SquareLoader";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function VerifyForm() {
    const [isTokenMissing, setIsTokenMissing] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const { isSuccess, isError, isLoading, data, error, mutateAsync } = api.auth.verifyEmail.useMutation({});

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setIsTokenMissing(true);
            return;
        }

        mutateAsync({ token });
    }, [mutateAsync]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setShouldRedirect(true);
            }, 3000);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (shouldRedirect) {
            redirect("/logIn");
        }
    }, [shouldRedirect]);

    return (
        <div className="flex flex-col items-center justify-center gap-[var(--padding-side)]">
            {isLoading && !isTokenMissing && (
                <>
                    <p className="text-center text-xl">Please wait while we verify your email.</p>
                    <SquareLoader size="lg" />
                    <p className="text-center text-base text-muted">This process shouldn't take too long.</p>
                </>
            )}
            {isError && (
                <FormAlertFailure
                    title="Validation error"
                    message={
                        error.shape?.data.zodError
                            ? error.data?.zodError?.fieldErrors.token!.reduce((prev, current) => {
                                  return prev + current;
                              })
                            : error.message
                    }
                />
            )}
            {isTokenMissing && (
                <FormAlertFailure title="Validation error" message={"No verification token has been provided."} />
            )}
            {isSuccess && (
                <FormAlertSuccess title="Email validated!" message={`You have successfully validated ${data.email}`} />
            )}
            <Separator />
            <p>
                <span className="text-muted"> If you are having trouble, contact support to receive assistance.</span>
            </p>
            <Button asChild className="justify-self-">
                <Link href={"/logIn"}>Go Back</Link>
            </Button>
        </div>
    );
}
