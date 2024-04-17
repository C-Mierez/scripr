"use client";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { GearIcon, HomeIcon, MoonIcon, QuestionMarkCircledIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import css from "./ThemeSwitcher.module.scss";
import { useEffect, useState } from "react";
import { CSSVariables } from "~/utils/utils";

export default function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    });

    const themes = ["light", "dark", "system"];

    return (
        <div className={css.themeSwitcher}>
            <Popover>
                <PopoverTrigger asChild>
                    {(isMounted &&
                        (resolvedTheme === "light" ? (
                            <SunIcon className={css.themeIcon} />
                        ) : (
                            <MoonIcon className={css.themeIcon} />
                        ))) ||
                        (!isMounted && <QuestionMarkCircledIcon className={css.themeIcon} />)}
                </PopoverTrigger>
                <PopoverContent className={css.popoverContainer}>
                    <ul className={css.themesList}>
                        {isMounted &&
                            themes.map((theme, index) => {
                                return (
                                    <li key={`theme_${index}`}>
                                        <Button
                                            variant={"ghost"}
                                            className={CSSVariables(
                                                css.themeSwitcherButton,
                                                "flex justify-start gap-[1ch] p-0"
                                            )}
                                            onClick={() => {
                                                setTheme(theme);
                                            }}
                                        >
                                            {theme === "light" ? (
                                                <SunIcon className={css.themeIcon} />
                                            ) : theme === "dark" ? (
                                                <MoonIcon className={css.themeIcon} />
                                            ) : (
                                                <HomeIcon className={css.themeIcon} />
                                            )}
                                            {theme}
                                        </Button>
                                    </li>
                                );
                            })}
                    </ul>
                </PopoverContent>
            </Popover>
        </div>
    );
}
