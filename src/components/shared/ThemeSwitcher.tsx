"use client";

import { MoonIcon, QuestionMarkCircledIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

import css from "./ThemeSwitcher.module.scss";

export default function ThemeSwitcher() {
    const { setTheme, resolvedTheme, theme, themes } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const setNextTheme = () => {
        if (theme && themes) {
            const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
            setTheme(nextTheme!); // theme is always in themes
            toast.info(`Theme set to ${nextTheme}`);
        }
    };

    return (
        <Button
            asChild
            size={"icon"}
            variant={"link"}
            onClick={() => {
                setNextTheme();
            }}
        >
            {(isMounted &&
                (resolvedTheme === "light" ? (
                    <SunIcon className={css.themeIcon} />
                ) : (
                    <MoonIcon className={css.themeIcon} />
                ))) ||
                (!isMounted && <QuestionMarkCircledIcon className={css.themeIcon} />)}
        </Button>
    );
}
