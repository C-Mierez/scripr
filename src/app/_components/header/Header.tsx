"use client";

import { useEffect, useState } from "react";
import SVGComponent from "../svg/SVG";
import css from "./Header.module.scss";
import { AnimatePresence, motion, useIsPresent, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { headerBrandingVariants, menuHeightVariants, menuNavLinksVariants, headerVariants } from "./HeaderAnims";
import { AnchorIDs } from "~/utils/data";
import { useLenis } from "@studio-freight/react-lenis";
import useDimensions from "~/hooks/useDimensions";

export default function Header() {
    const navLinks = [
        {
            name: "Pricing",
            href: `#${AnchorIDs.Pricing}`,
        },
        {
            name: "Contact",
            href: `#${AnchorIDs.Contact}`,
        },
        {
            name: "Get Started",
            href: "/",
        },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /* ---------------------------- Header Animations --------------------------- */
    const [collapseBranding, setCollapseBranding] = useState(false);
    const [collapseHeader, setCollapseHeader] = useState(true);
    const { scrollY } = useScroll();
    const { height } = useDimensions();
    const showBrandingThreshold = height * 0.2;
    const showHeaderThreshold = height;

    useMotionValueEvent(scrollY, "change", (latest) => {
        // If Menu is open, ignore changes
        if (isMenuOpen) return;

        const prev = scrollY.getPrevious();

        /* --------------------------- Branding Thresholds -------------------------- */
        if (collapseBranding && latest < showBrandingThreshold) {
            setCollapseBranding(false);
        } else if (!collapseBranding && latest > showBrandingThreshold) {
            setCollapseBranding(true);
        }
        /* ---------------------------- Header Thresholds --------------------------- */
        if (latest > showHeaderThreshold) {
            if (collapseHeader && prev > latest) {
                setCollapseHeader(false);
            } else if (!collapseHeader && prev < latest) {
                setCollapseHeader(true);
            }
        } else if (!collapseHeader && latest <= showHeaderThreshold) {
            setCollapseHeader(true);
        }
    });
    /* ---------------------------------- Lenis --------------------------------- */
    const lenis = useLenis();

    /* ------------------------------- Menu Toggle ------------------------------ */
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <motion.header
            className={css.header}
            /* ------------------------------ FramerMotion ------------------------------ */
            variants={headerVariants}
            initial="initial"
            animate={collapseHeader ? "collapse" : "expanded"}
        >
            <nav className={css.nav}>
                <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Menu"}</button>
                <motion.div
                    className={css.branding}
                    onClick={() => {
                        lenis.scrollTo(0);
                    }}
                    /* ------------------------------ FramerMotion ------------------------------ */
                    variants={headerBrandingVariants}
                    initial="initial"
                    animate={collapseBranding ? "collapse" : "expanded"}
                >
                    <div className={css.logo}>
                        <SVGComponent.ScriprLogo />
                    </div>
                    <p className={css.name}>SCRIPR</p>
                </motion.div>
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
                                        onClick={() => {
                                            if (link.href.startsWith("#")) {
                                                lenis.scrollTo(link.href);
                                            }
                                        }}
                                    >
                                        {link.name}
                                    </motion.a>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
                <AnimatePresence mode="wait">
                    {isMenuOpen && (
                        <Menu
                            isMenuOpen={isMenuOpen}
                            callback={() => {
                                setIsMenuOpen(false);
                            }}
                        />
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}

function Menu({ isMenuOpen, callback }: { isMenuOpen?: boolean; callback: () => void }) {
    const menuItems = [
        {
            name: "Home",
            href: `#${AnchorIDs.Home}`,
        },
        {
            name: "Features",
            href: `#${AnchorIDs.Features}`,
        },
        {
            name: "Pricing",
            href: `#${AnchorIDs.Pricing}`,
        },
        {
            name: "Contact",
            href: `#${AnchorIDs.Contact}`,
        },
        {
            name: "FAQ",
            href: `#${AnchorIDs.FAQ}`,
        },
        {
            name: "About",
            href: `#${AnchorIDs.About}`,
        },
        {
            name: "Get Started",
            href: "/",
        },
    ];

    const lenis = useLenis();
    const isPresent = useIsPresent();
    const [activeItem, setActiveItem] = useState(-1);
    const defaultActive = 0;

    useEffect(() => {
        if (isPresent) {
            setActiveItem(0);
        } else {
            setActiveItem(-1);
        }
    }, [isPresent]);

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
                    <li
                        key={`menuItem${index}`}
                        className={activeItem === index ? css.active : ""}
                        onPointerEnter={() => {
                            if (isPresent) {
                                setActiveItem(index);
                            } else {
                                setActiveItem(-1);
                            }
                        }}
                        onClick={() => {
                            setActiveItem(index);
                            callback();
                        }}
                        onPointerLeave={() => {
                            setActiveItem(defaultActive);
                        }}
                    >
                        {isMenuOpen && (
                            <span>
                                <motion.a
                                    key={`menuItemLink${index}`}
                                    href={item.href}
                                    onClick={() => {
                                        if (item.href.startsWith("#")) {
                                            lenis.scrollTo(item.href);
                                        }
                                    }}
                                    /* ------------------------------ FramerMotion ------------------------------ */
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
                        <a href="https://github.com/C-Mierez/scripr" target="_blank">
                            <SVGComponent.GitHubLogo />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/CMierez_" target="_blank">
                            <SVGComponent.XLogo />
                        </a>
                    </li>
                </ul>
            </div>
        </motion.div>
    );
}
