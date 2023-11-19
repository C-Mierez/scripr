"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import css from "./HeroSection.module.scss";
import SVGComponent from "../../svg/SVG";
import HeroButton from "../HeroButton";

export default function HeroSection() {
    // Locomotive Scroll Initialization
    useEffect(() => {
        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;
            new LocomotiveScroll({
                lenisOptions: {
                    lerp: 0.08,
                    touchMultiplier: 0.05,
                    smoothTouch: false,
                },
            });
        })().catch((e) => {
            console.log(e);
        });
    }, []);

    const heroSectionRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroSectionRef });
    const { scrollY: viewportScrollY } = useScroll();

    /* ------------------------------ Section Anim ------------------------------ */
    const padding = useTransform(viewportScrollY, [0, 300], ["1.5lvh", "0lvh"]);
    const borderRadius = useTransform(viewportScrollY, [0, 300], ["6lvh", "0lvh"]);

    /* -------------------------------- Grid Anim ------------------------------- */
    const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100%", "120%"]);

    /* ------------------------------- Slogan Anim ------------------------------ */
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0, 0.8], ["0%", "20%"]);

    return (
        <div ref={heroSectionRef} className={css.heroWrapper}>
            <motion.section className={css.hero} style={{ paddingInline: padding, paddingTop: padding }}>
                <div className={css.outerBackground} />
                <motion.div className={css.innerCard} style={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}>
                    <div className={css.gridBackgroundWrapper}>
                        <motion.div className={css.gridBackground} style={{ backgroundSize }} />
                    </div>
                    <div className={css.branding}>
                        <div className={css.logo}>
                            <SVGComponent.ScriprLogo />
                        </div>
                        <p className={css.name}>SCRIPR</p>
                    </div>
                    <motion.div className={css.slogan} style={{ translateY }}>
                        <motion.h1 style={{ opacity, scale }}>All your Finances</motion.h1>
                        <motion.h2 style={{ opacity, scale }}>in one single place</motion.h2>
                    </motion.div>
                    <div className={css.cta}>
                        <HeroButton />
                        <div className={css.description}>
                            <p>Billed annually. Only 5$ a month.</p>
                            <p>Join us now. Cancel any time.</p>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
            <div className={css.heroScrollSpacer} />
        </div>
    );
}