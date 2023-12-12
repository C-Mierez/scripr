"use client";

import { useState } from "react";
import SVGComponent from "../svg/SVG";
import css from "./Header.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { menuHeightVariants, menuNavLinksVariants } from "./HeaderAnims";

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
                                        custom={{ index, length: navLinks.length, globalDelay: 0.5 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
                <AnimatePresence mode="wait">{isMenuOpen && <Menu isMenuOpen={isMenuOpen} />}</AnimatePresence>
            </nav>
        </header>
    );
}

function Menu({ isMenuOpen }: { isMenuOpen?: boolean }) {
    const menuItems = [
        {
            name: "Home",
            href: "#",
        },
        {
            name: "Features",
            href: "#",
        },
        {
            name: "Pricing",
            href: "#",
        },
        {
            name: "Contact",
            href: "#",
        },
        {
            name: "FAQ",
            href: "#",
        },
        {
            name: "About",
            href: "#",
        },
        {
            name: "Get Started",
            href: "#",
        },
    ];
    return (
        <motion.div
            className={css.menu}
            variants={menuHeightVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            custom={{ length: menuItems.length }}
        >
            <ul className={css.menuList}>
                {menuItems.map((item, index) => (
                    <li key={`menuItem${index}`}>
                        {isMenuOpen && (
                            <span>
                                <motion.a
                                    key={`menuItemLink${index}`}
                                    href={item.href}
                                    variants={menuNavLinksVariants}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    custom={{ index, length: menuItems.length, globalDelay: 0 }}
                                >
                                    {item.name}
                                </motion.a>
                            </span>
                        )}
                    </li>
                ))}
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
