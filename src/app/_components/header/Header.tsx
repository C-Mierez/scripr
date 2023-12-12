"use client";

import { useState } from "react";
import SVGComponent from "../svg/SVG";
import css from "./Header.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { transition } from "~/utils/animations";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Menu"}</button>
                <div className={css.branding}>
                    <div className={css.logo}>
                        <SVGComponent.ScriprLogo />
                    </div>
                    <p className={css.name}>SCRIPR</p>
                </div>
                <ul className={css.links}>
                    <li>
                        <a href="#">Pricing</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li>
                        <a href="#">Launch</a>
                    </li>
                </ul>
                <AnimatePresence>{isMenuOpen && <Menu />}</AnimatePresence>
            </nav>
        </header>
    );
}

function Menu() {
    return (
        <motion.div className={css.menu} variants={menuHeightVariants} initial="initial" animate="enter" exit="exit">
            <ul className={css.menuList}>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Features</a>
                </li>
                <li>
                    <a href="#">Pricing</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
                <li>
                    <a href="#">FAQ</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Get Started</a>
                </li>
            </ul>
            <div className={css.foot}>
                <p>{"hello@scripr.com"}</p>
                <p>All your finances, in one single place.™</p>
                <ul>
                    <li>
                        <SVGComponent.GitHubLogo />
                    </li>
                    <li>
                        <SVGComponent.XLogo />
                    </li>
                </ul>
            </div>
        </motion.div>
    );
}

const menuHeightVariants = {
    initial: {
        height: 0,
    },
    enter: {
        height: "auto",
        transition,
    },
    exit: {
        height: 0,
        transition,
    },
};
