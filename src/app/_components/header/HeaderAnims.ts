import { Variants } from "framer-motion";
import { delay, transition } from "~/utils/animations";

export const menuHeightVariants: Variants = {
    initial: {
        height: 0,
    },
    enter: {
        height: "auto",
        transition,
    },
    exit: {
        height: 0,
        transition,
    },
};

export type VariantDelayParams = { index: number; length: number };

export const menuNavLinksVariants: Variants = {
    initial: {
        translateY: "100%",
    },
    enter: ({ index, length }: VariantDelayParams) => ({
        translateY: "0%",
        transition: { ...transition, delay: index * delay },
    }),
    exit: ({ index, length }: VariantDelayParams) => ({
        translateY: "100%",
        transition: { ...transition, delay: (length - index) * delay },
    }),
};
