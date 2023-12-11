"use client";

import SVGComponent from "../svg/SVG";
import css from "./Header.module.scss";

export default function Header() {
    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <button>Menu</button>
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
                <div className={css.menu}>
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
                </div>
            </nav>
        </header>
    );
}
