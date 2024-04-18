"use client";

import css from "./AboutSection.module.scss";
import sharedCss from "../shared.module.scss";
import { cn } from "~/lib/utils";
import { AnchorIDs } from "../../../../lib/data";
import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { defaultAnim } from "~/lib/animations";

export default function AboutSection() {
    return (
        <>
            <div className={sharedCss.anchor} id={AnchorIDs.About} />
            <header className={css.about}>
                <h1 className={cn(sharedCss.headerDecorated, sharedCss.alt)}>About Us</h1>
                <p>
                    We're a small but mighty team of people who are all about helping to make finance less overwhelming
                    and more accessible to people
                </p>
            </header>

            <section className={css.about}>
                <ScrollerSection />

                <motion.h1
                    {...defaultAnim({
                        initial: {
                            opacity: 0,
                            y: 100,
                        },
                        inView: {
                            opacity: 1,
                            y: 0,
                        },
                    })}
                    viewport={{ margin: "0%", once: false }}
                >
                    What are you waiting for?
                    <motion.div
                        className={css.progressBar}
                        {...defaultAnim({
                            initial: {
                                scaleX: 0,
                            },
                            inView: {
                                scaleX: 1,
                            },
                        })}
                        viewport={{ margin: "-20%", once: false }}
                    ></motion.div>
                </motion.h1>
            </section>
        </>
    );
}

function ScrollerSection() {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start center", "end end"],
    });

    const progressBarWidth = useTransform(scrollYProgress, [0.1, 1], ["0%", "100%"]);

    const subheaderOpacity = useTransform(scrollYProgress, [0, 0.025, 0.1], [0, 0, 1]);

    const textScrollerTranslateY = useTransform(
        scrollYProgress,
        [0, 0.3, 0.4, 0.55, 0.65, 0.8, 0.95],
        ["0%", "0%", "-25%", "-25%", "-50%", "-50%", "-75%"]
    );

    return (
        <div ref={targetRef} className={css.stickyWrapper}>
            <div className={css.scrollerSection}>
                <motion.h2
                    style={{
                        opacity: subheaderOpacity,
                    }}
                >
                    So we've combined finance tracking to suit all your potential needs.
                    <motion.div
                        className={css.progressBar}
                        style={{
                            scaleX: progressBarWidth,
                        }}
                    ></motion.div>
                </motion.h2>

                <motion.div
                    className={cn(css.textScroller, "bg-[var(--color-primary-600)] dark:bg-[var(--color-primary-800)]")}
                    {...defaultAnim({
                        initial: {
                            y: "100%",
                            opacity: 0,
                        },
                        inView: {
                            y: "0%",
                            opacity: 1,
                        },
                    })}
                >
                    <motion.ul
                        className={css.scrollList}
                        style={{
                            y: textScrollerTranslateY,
                        }}
                    >
                        <li>INVESTMENTS</li>
                        <li>EXPENSES</li>
                        <li>INCOME</li>
                        <li>EARNINGS</li>
                    </motion.ul>
                </motion.div>
            </div>
        </div>
    );
}
