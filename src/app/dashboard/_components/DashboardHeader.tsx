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

export default function DashboardHeader() {
    const menuItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Investments",
            href: "/dashboard/investments",
        },
        {
            label: "Expenses",
            href: "/dashboard/expenses",
        },
        {
            label: "Income",
            href: "/dashboard/income",
        },
        {
            label: "Analytics",
            href: "/dashboard/analytics",
        },
        {
            label: "Example",
            href: "/dashboard/example",
        },
    ];

    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <div className={css.leftNav}>
                    <a href="/">
                        <SVGComponent.ScriprLogo />
                    </a>
                    <p>CMierez's Portfolio</p>
                </div>
                <div className={css.rightNav}>
                    <p>Help</p>
                    <p>Docs</p>
                    <ThemeSwitcher />
                    <Avatar>
                        <AvatarImage src="https://github.com/c-mierez.png" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </div>
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
