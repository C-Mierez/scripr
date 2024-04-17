import { Button } from "~/components/ui/button";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import AuthHero from "../_components/AuthHero";
import AuthScaffold from "../_components/AuthScaffold";
import Link from "next/link";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";

export default function AuthError() {
    return (
        <AuthScaffold>
            <AuthHero
                label="Oops!"
                header="Something went wrong."
                subheader="
            "
            />
            <AuthFormWrapper>
                <div className="flex flex-col items-center justify-center gap-[var(--padding-side)]">
                    <p className="text-center text-xl">An error ocurred while trying to authenticate your account.</p>
                    <Button asChild className="h-28 text-6xl">
                        <Link href={"logIn"}>
                            <ArrowTopLeftIcon className="h-full w-full ml-[-1rem]" />
                            Go Back
                        </Link>
                    </Button>
                    <p>
                        <span className="text-muted">
                            {" "}
                            If the error persists, contact support for further assistance.
                        </span>
                    </p>
                </div>
            </AuthFormWrapper>
        </AuthScaffold>
    );
}
