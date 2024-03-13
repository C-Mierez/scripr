"use client";

import { useState } from "react";

import css from "./DashboardHeader.module.scss";
import UserSheet from "./UserSheet";

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
            <UserSheet></UserSheet>
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
