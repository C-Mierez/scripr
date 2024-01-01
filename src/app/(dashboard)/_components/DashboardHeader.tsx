"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import css from "./DashboardHeader.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SVGComponent from "~/app/_components/svg/SVG";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeSwitcher from "./ThemeSwitcher";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

export default function DashboardHeader() {
    const menuItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Investments",
            href: "/investments",
        },
        {
            label: "Expenses",
            href: "/expenses",
        },
        {
            label: "Income",
            href: "/income",
        },
        {
            label: "Analytics",
            href: "/analytics",
        },
        {
            label: "Example",
            href: "/example",
        },
    ];

    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <LeftNav />
                <RightNav />
            </nav>
            <NavigationMenu className={css.menu}>
                <NavigationMenuList>
                    {menuItems.map((item, index) => (
                        <MenuItem key={`menuItem_${index}`} label={item.label} href={item.href} />
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}

// TODO: Make this fetched from the db
const portfolios = [
    {
        value: "cmierez's Portfolio",
        label: "CMierez's Portfolio",
    },
    {
        value: "friend's pet shop",
        label: "Friend Pet's Shop",
    },
    {
        value: "family",
        label: "Family",
    },
];

function LeftNav() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <div className={css.leftNav}>
            <a href="/">
                <SVGComponent.ScriprLogo />
            </a>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className={css.button}>
                        {value
                            ? portfolios.find((portfolio) => portfolio.value === value)?.label
                            : "Select portfolio..."}
                        <CaretSortIcon className={css.buttonIcon} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search portfolio..." className="h-9" />
                        <CommandEmpty>No portfolio found.</CommandEmpty>
                        <CommandGroup>
                            {portfolios.map((portfolio) => (
                                <CommandItem
                                    key={portfolio.value}
                                    value={portfolio.value}
                                    onSelect={(currentValue: any) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {portfolio.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === portfolio.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

function RightNav() {
    return (
        <div className={css.rightNav}>
            <p>Help</p>
            <p>Docs</p>
            <ThemeSwitcher />
            <a href="/logIn">
                <Avatar>
                    <AvatarImage src="https://github.com/c-mierez.png" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </a>
        </div>
    );
}

function MenuItem({ label, href }: { label: string; href: string }) {
    const pathname = usePathname();
    return (
        <NavigationMenuItem className={pathname === href ? css.active : ""}>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{label}</NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
}
