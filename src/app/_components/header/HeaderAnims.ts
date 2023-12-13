import { Variants } from "framer-motion";
import { staggerDelay, transition } from "~/utils/animations";

export const headerBrandingVariants: Variants = {
    initial: {
        translateY: "125%",
        transition,
    },
    collapse: {
        translateY: "0%",
        transition,
    },
    expanded: {
        translateY: "125%",
        transition,
    },
};

export const headerVariants: Variants = {
    initial: {
        translateY: "-100%",
    },
    collapse: {
        translateY: "-100%",
        transition,
    },
    expanded: {
        translateY: "0%",
        transition,
    },
};

export const menuHeightVariants: Variants = {
    initial: {
        height: 0,
    },
    enter: {
        height: "auto",
        transition,
    },
    exit: ({ length }) => ({
        height: 0,
        transition: { ...transition, delay: staggerDelay * (length + 1) },
    }),
};

export const menuNavLinksVariants: Variants = {
    initial: {
        translateY: "100%",
    },
    enter: ({ index, length, globalDelay }) => ({
        translateY: "0%",
        transition: { ...transition, delay: globalDelay + index * staggerDelay },
    }),
    exit: ({ index, length }) => ({
        translateY: "100%",
        transition: { ...transition, delay: (length - index) * staggerDelay },
    }),
};
