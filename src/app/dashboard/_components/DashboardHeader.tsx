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

export default function DashboardHeader() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div>Logo</div>
        <div>Profile</div>
      </nav>
      <NavigationMenu className={css.menu}>
        <NavigationMenuList>
          <MenuItem label="Dashboard" active={true} />
          <MenuItem label="Investments" />
          <MenuItem label="Expenses" />
          <MenuItem label="Income" />
          <MenuItem label="Analytics" />
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function MenuItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <NavigationMenuItem className={active ? css.active : ""}>
      <Link href="/dashboard" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{label}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
