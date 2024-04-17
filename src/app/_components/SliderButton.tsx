"use client";

import { useState } from "react";
import css from "./SliderButton.module.scss";
import { motion } from "framer-motion";
import { bezierEase, mediumDuration, defaultAnim } from "~/lib/animations";
import { HeroSectionVariants } from "./home/section/HeroSectionAnims";

export default function SliderButton({ label, href }: { label: string; href: string }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <a
            className={css.buttonContainer}
            href={href}
            onPointerEnter={() => {
                setIsActive(true);
            }}
            onClick={() => {
                setIsActive(true);
            }}
            onPointerLeave={() => {
                setIsActive(false);
            }}
        >
            <motion.div
                className={css.slider}
                animate={{ top: !isActive ? "0%" : "-100%" }}
                transition={{ duration: mediumDuration, ease: bezierEase }}
            >
                <motion.div className={css.face} {...defaultAnim(HeroSectionVariants.CTAButton)}>
                    <p>{label}</p>
                </motion.div>
                <div className={css.face}>
                    <p>{label}</p>
                </div>
            </motion.div>
        </a>
    );
}
