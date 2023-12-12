"use client";

import { useState } from "react";
import SVGComponent from "../svg/SVG";
import css from "./Header.module.scss";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { VariantDelayParams, menuHeightVariants, menuNavLinksVariants } from "./HeaderAnims";

export default function Header() {
    const navLinks = [
        {
            name: "Pricing",
            href: "#",
        },
        {
            name: "Contact",
            href: "#",
        },
        {
            name: "Get Started",
            href: "#",
        },
    ];
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
                    {navLinks.map((link, index) => (
                        <li key={`navItem${index}`}>
                            <AnimatePresence mode="wait">
                                {!isMenuOpen && (
                                    <motion.a
                                        key={`navLink${index}`}
                                        href={link.href}
                                        variants={menuNavLinksVariants}
                                        initial="initial"
                                        animate="enter"
                                        exit="exit"
                                        custom={{ index, length: navLinks.length } as VariantDelayParams}
                                    >
                                        {link.name}
                                    </motion.a>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
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
