"use client";

import { useRef, useState } from "react";
import css from "./section/FAQSection.module.scss";
import IconComponent from "../svg/Icon";
import { CSSVariables } from "~/utils/utils";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { layoutTransition } from "~/utils/animations";

export type FAQCardData = {
    question: string;
    answer: string;
};

export default function FAQCard(props: FAQCardData) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div className={CSSVariables(css.faqCard, isOpen ? css.open : undefined)} transition={{ layout: layoutTransition }} layout>
            <motion.div className={css.header} onClick={toggleOpen} layout="position">
                <h3>{props.question}</h3>
                <div className={CSSVariables(css.icon, isOpen ? css.open : undefined)}>
                    <IconComponent.ExpandDropdown />
                </div>
            </motion.div>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        className={CSSVariables(css.answer, isOpen ? css.open : undefined)}
                        transition={{ layout: layoutTransition }}
                        exit={{ height: "0px", paddingBottom: "0" }}
                        layout="position"
                    >
                        <p>{props.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
