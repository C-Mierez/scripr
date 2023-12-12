import { Variants } from "framer-motion";
import { staggerDelay, transition } from "~/utils/animations";

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
        transition: { ...transition, delay: staggerDelay * length },
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
