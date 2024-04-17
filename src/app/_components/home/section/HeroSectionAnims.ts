import { VariantsList, delay, duration, shortDuration, transition } from "~/lib/animations";

export const HeroSectionVariants: VariantsList = {
    GridBackground: {
        initial: {
            backgroundSize: "150%",
        },
        enter: {
            backgroundSize: "100%",
            transition: { ...transition, duration: duration + shortDuration },
        },
    },
    SloganH1: {
        initial: {
            opacity: 0,
            y: 50,
        },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                ...transition,
                duration: shortDuration,
                delay,
            },
        },
    },
    SloganH2: {
        initial: {
            opacity: 0,
            y: 50,
        },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                ...transition,
                delay: shortDuration,
            },
        },
    },
    CTADesc: {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
            transition: {
                ...transition,
                delay: shortDuration * 3,
            },
        },
    },
    CTAButton: {
        initial: {
            y: "100%",
        },
        enter: {
            y: "0%",
            transition: {
                ...transition,
                delay: shortDuration * 4,
            },
        },
    },
};
