"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SlidingButton from "~/components/SlidingButton";
import { defaultAnim } from "~/lib/animations";
import { AnchorIDs } from "~/lib/data";

import sharedCss from "../shared.module.scss";
import css from "./HeroSection.module.scss";
import { HeroSectionVariants } from "./HeroSectionAnims";

export default function HeroSection() {
    const heroSectionRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroSectionRef });
    const { scrollY: viewportScrollY } = useScroll();

    /* ------------------------------ Section Anim ------------------------------ */
    const padding = useTransform(viewportScrollY, [0, 300], ["1lvh", "0lvh"]);
    const borderRadius = useTransform(viewportScrollY, [0, 300], ["6lvh", "0lvh"]);

    /* -------------------------------- Grid Anim ------------------------------- */
    const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100%", "120%"]);

    /* ------------------------------- Slogan Anim ------------------------------ */
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0, 0.8], ["0%", "20%"]);

    return (
        <>
            <div className={sharedCss.anchor} id={AnchorIDs.Home} />
            <div ref={heroSectionRef} className={css.heroWrapper}>
                <motion.section className={css.hero} style={{ paddingInline: padding, paddingTop: padding }}>
                    <div className={css.outerBackground} />
                    <motion.div
                        className={css.innerCard}
                        style={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}
                    >
                        <div className={css.gridBackgroundWrapper}>
                            <motion.div
                                className={css.gridBackground}
                                {...defaultAnim(HeroSectionVariants.GridBackground)}
                                style={{ backgroundSize }}
                            />
                        </div>

                        <motion.div className={css.slogan} style={{ translateY }}>
                            <motion.h1 {...defaultAnim(HeroSectionVariants.SloganH1)} style={{ opacity, scale }}>
                                All your Finances
                            </motion.h1>
                            <motion.h2 {...defaultAnim(HeroSectionVariants.SloganH2)} style={{ opacity, scale }}>
                                in one single place
                            </motion.h2>
                        </motion.div>
                        <motion.div className={css.cta} {...defaultAnim(HeroSectionVariants.CTADesc)}>
                            <SlidingButton label="Get Started" href="/dashboard" />
                            <motion.div className={css.description} {...defaultAnim(HeroSectionVariants.CTADesc)}>
                                <p>Billed annually. Only 5$ a month.</p>
                                <p>Join us now. Cancel any time.</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.section>
                <div className={css.heroScrollSpacer} />
            </div>
        </>
    );
}
