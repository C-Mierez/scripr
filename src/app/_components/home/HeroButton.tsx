"use client";

import { useState } from "react";
import css from "./HeroButton.module.scss";
import { motion } from "framer-motion";
import { bezierEase, mediumDuration } from "~/utils/animations";

export default function HeroButton() {
    const [isActive, setIsActive] = useState(false);

    return (
        <a
            className={css.buttonContainer}
            onClick={() => {
                setIsActive(!isActive);
            }}
        >
            <motion.div className={css.slider} animate={{ left: !isActive ? "0%" : "-100%" }} transition={{ duration: mediumDuration, ease: bezierEase }}>
                <div className={css.face}>
                    <p>Get Started</p>
                </div>
                <div className={css.face}>
                    <p>Get Started</p>
                </div>
            </motion.div>
        </a>
    );
}

function GhostText(props: { label: string }) {
    return (
        <div className={css.ghostText}>
            <p>{props.label}</p>
            <p>{props.label}</p>
        </div>
    );
}
