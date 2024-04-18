import { Transition, Variants } from "framer-motion";

export const animationEase = [0.76, 0, 0.24, 1];

export const shortDuration = 0.3;
export const mediumDuration = 0.5;
export const duration = 0.8;

export const staggerDelay = 0.05;

export const delay = 0.5;

export const transition = { duration: duration, ease: animationEase } as Transition;

export const layoutTransition = { duration: mediumDuration, bezierEase: animationEase };

export type VariantsList = {
    [key: string]: Variants;
};

// To be used as a default property setter for Framer Motion elements
// Normally:
// <motion.div variants={MyVariant} initial="initial" animate="enter" exit="exit" />
// With this:
// <motion.div variants={defaultAnim(MyVariant)} />
export const defaultAnim = (variants: Variants | undefined) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        transition: transition,
        whileInView: "inView",
        viewport: { margin: "-20%", once: true },
        variants,
    };
};
