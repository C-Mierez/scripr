import { Button } from "@/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function BackToLandingButton() {
    return (
        <Button size={"icon"} className="gap-[1ch]" asChild>
            <Link href={"/"}>
                <ExitIcon />
            </Link>
            {/* Back */}
        </Button>
    );
}
