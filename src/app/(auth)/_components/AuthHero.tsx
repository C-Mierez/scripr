"use client";

import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { transition } from "~/utils/animations";

import css from "./AuthHero.module.scss";

interface AuthHeroProps {
    label: string;
    header: string;
    subheader: string;
}

const enterVariant: Variants = {
    initial: { opacity: 0, y: "30%" },
    animate: { opacity: 1, y: 0 },
};

export default function AuthHero({ label, header, subheader }: AuthHeroProps) {
    const path = usePathname();

    // Reset page doesn't need to animate in
    const variantToUse = path === "/reset" ? {} : enterVariant;

    return (
        <section className={css.hero}>
            <motion.div
                variants={variantToUse}
                initial="initial"
                animate="animate"
                transition={{ ...transition, delay: 0 }}
                className={css.label}
            >
                {label}
            </motion.div>
            <motion.h1
                variants={variantToUse}
                initial="initial"
                animate="animate"
                transition={{ ...transition, delay: 0.2 }}
                className={css.header}
            >
                {header}
            </motion.h1>
            <motion.p
                variants={variantToUse}
                initial="initial"
                animate="animate"
                transition={{ ...transition, delay: 0.8 }}
                className={css.subheader}
            >
                {subheader}
            </motion.p>
        </section>
    );
}
