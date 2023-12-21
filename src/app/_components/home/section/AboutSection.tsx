"use client";

import css from "./AboutSection.module.scss";
import sharedCss from "../shared.module.scss";
import { CSSVariables } from "~/utils/utils";
import { AnchorIDs } from "../../../../utils/data";
import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { defaultAnim } from "~/utils/animations";

export default function AboutSection() {
    const firstSectionRef = useRef(null);
    const secondSectionRef = useRef(null);

    /* ------------------------------ First Section ----------------------------- */
    const { scrollYProgress: firstScrollYProgress } = useScroll({
        target: firstSectionRef,
        offset: ["start center", "end center"],
    });

    const firstProgressBarHeight = useTransform(firstScrollYProgress, [0, 1], ["0%", "100%"]);

    const firstTextsTranslateX = [
        useTransform(firstScrollYProgress, [0, 0.15, 0.3], ["15%", "15%", "0%"]),
        useTransform(firstScrollYProgress, [0, 0.45, 0.6], ["15%", "15%", "0%"]),
    ];

    const firstTextsOpacity = [
        useTransform(firstScrollYProgress, [0, 0.15, 0.3], ["0", "0", "1"]),
        useTransform(firstScrollYProgress, [0, 0.45, 0.6], ["0", "0", "1"]),
    ];

    /* ----------------------------- Second Section ----------------------------- */
    const { scrollYProgress: secondScrollYProgress } = useScroll({
        target: secondSectionRef,
        offset: ["start center", "end center"],
    });

    const secondProgressBarHeight = useTransform(secondScrollYProgress, [0, 1], ["0%", "100%"]);

    const secondTextsTranslateX = [
        useTransform(secondScrollYProgress, [0, 0.15, 0.3], ["15%", "15%", "0%"]),
        useTransform(secondScrollYProgress, [0, 0.45, 0.6], ["15%", "15%", "0%"]),
    ];

    const secondTextsOpacity = [
        useTransform(secondScrollYProgress, [0, 0.15, 0.3], ["0", "0", "1"]),
        useTransform(secondScrollYProgress, [0, 0.45, 0.6], ["0", "0", "1"]),
    ];

    return (
        <>
            <div className={sharedCss.anchor} id={AnchorIDs.About} />
            <header className={css.about}>
                <h1 className={CSSVariables(sharedCss.headerDecorated, sharedCss.alt)}>About Us</h1>
                <p>
                    We're a small but mighty team of people who are all about helping to make finance less overwhelming
                    and more accessible to people
                </p>
            </header>

            <section className={css.about}>
                <div ref={firstSectionRef} className={css.timelineGrid}>
                    <div />
                    <motion.div
                        className={css.timeline}
                        style={{
                            scaleY: firstProgressBarHeight,
                        }}
                    />
                    <div className={css.timelineContent}>
                        <motion.p
                            style={{
                                x: firstTextsTranslateX[0],
                                opacity: firstTextsOpacity[0],
                            }}
                        >
                            We know that keeping track of your money can be a hassle.
                        </motion.p>
                        <motion.p
                            style={{
                                x: firstTextsTranslateX[1],
                                opacity: firstTextsOpacity[1],
                            }}
                        >
                            Our goal is to help as many people as possible take control of their finances.
                        </motion.p>
                    </div>
                </div>

                <ScrollerSection />

                <div ref={secondSectionRef} className={css.timelineGrid}>
                    <div />
                    <motion.div
                        className={css.timeline}
                        style={{
                            scaleY: secondProgressBarHeight,
                        }}
                    ></motion.div>
                    <div className={css.timelineContent}>
                        <motion.p
                            style={{
                                x: secondTextsTranslateX[0],
                                opacity: secondTextsOpacity[0],
                            }}
                        >
                            We believe that everyone should have access to the tools and information they need to make
                            smart financial moves.
                        </motion.p>
                        <motion.p
                            style={{
                                x: secondTextsTranslateX[1],
                                opacity: secondTextsOpacity[1],
                            }}
                        >
                            We strive to provide a clearer view of your financial picture, allowing you to take control
                            of your finance.
                        </motion.p>
                    </div>
                </div>

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
                    viewport={{ margin: "-20%", once: false }}
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

                <div className={css.textScroller}>
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
                </div>
            </div>
        </div>
    );
}
