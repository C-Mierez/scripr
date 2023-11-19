import { Content } from "~/utils/data";

import FAQCard from "../FAQCard";
import css from "./FAQSection.module.scss";
import { LayoutGroup, motion } from "framer-motion";
import { layoutTransition } from "~/utils/animations";

export default function FAQSection() {
    return (
        <LayoutGroup>
            <motion.section transition={{ layout: layoutTransition }} layout="size" className={css.faq}>
                <div className={css.stickyGrid}>
                    <motion.header transition={{ layout: layoutTransition }} layout="position">
                        <h1>Frequently</h1>
                        <h2>Asked Questions</h2>
                    </motion.header>
                    <div className={css.cardContainer}>
                        {Content.FAQ.FAQCardData.map((card, index) => (
                            <FAQCard key={`faqCard_${index}`} question={card.question} answer={card.answer} />
                        ))}
                    </div>
                </div>
            </motion.section>
        </LayoutGroup>
    );
}
