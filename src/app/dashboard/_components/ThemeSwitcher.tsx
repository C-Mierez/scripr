"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoonIcon, QuestionMarkCircledIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import css from "./DashboardHeader.module.scss";
import { useEffect, useState } from "react";

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
                                            className={css.themeSwitcherButton}
                                            onClick={() => {
                                                setTheme(theme);
                                            }}
                                        >
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
