"use client";

import { useState } from "react";
import css from "../home.module.scss";
import { motion } from "framer-motion";
import { bezierEase, mediumDuration } from "~/utils/animations";

export default function ButtonCTA() {
    const [isActive, setIsActive] = useState(false);

    return (
        <button
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
        </button>
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
