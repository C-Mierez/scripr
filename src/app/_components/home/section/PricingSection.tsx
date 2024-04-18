"use client";

import { Variants, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { defaultAnim, duration, staggerDelay, transition } from "~/lib/animations";
import { Content } from "~/lib/data";
import { cn } from "~/lib/utils";

import { AnchorIDs } from "../../../../lib/data";
import IconComponent from "../../svg/Icon";
import CustomPlanCard from "../CustomPlanCard";
import sharedCss from "../shared.module.scss";
import css from "./PricingSection.module.scss";
import { useRef, useState } from "react";

export default function PricingSection() {
    return (
        <>
            <div className={sharedCss.anchor} id={AnchorIDs.Pricing} />
            <header className={cn(css.pricing, "bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-50)]")}>
                <h1 className={sharedCss.headerDecorated}>Pricing</h1>
                <h2>Choose a plan that suits you best</h2>
            </header>
            <section className={cn(css.pricing, "bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-50)]")}>
                <div className={css.planCardGrid}>
                    {Content.Plans.PlansCardData.map((plan, index) => (
                        <PlanCard
                            key={`plan_${index}`}
                            label={plan.label}
                            name={plan.name}
                            price={plan.price}
                            priceLabel={plan.priceLabel}
                            description={plan.description}
                            featuresTitle={plan.featuresTitle}
                            features={plan.features}
                            alt={plan.alt}
                        />
                    ))}
                </div>
                <h2>Or build your own</h2>
                <div className={css.planCardGrid}>
                    <CustomPlanCard />
                </div>
                <div className={css.contentWrapper}>
                    <div className={css.divider} />
                    <div className={css.deals}>
                        <div className={css.deal}>
                            <h2>A plan for everyone</h2>
                            <p>
                                We ensure every customer gets pricing that aligns to their budget and business needs.
                                Consult with our sales team to assist you with choosing the best options for you.
                            </p>
                            <a href={`#${AnchorIDs.Contact}`}>
                                <span>
                                    <motion.button
                                        {...defaultAnim({
                                            initial: {
                                                y: "100%",
                                            },
                                            inView: {
                                                y: "0%",
                                            },
                                        })}
                                    >
                                        Contact Sales
                                    </motion.button>
                                </span>
                            </a>
                        </div>
                        <div className={css.deal}>
                            <h2>Are you a student?</h2>
                            <p>
                                {
                                    "We acknowledge that 20$ a year is probably a bit too much for your McDonald's salary. We can provide you with a premium trial for your first year of use. "
                                }
                            </p>
                            <span>
                                <motion.button
                                    {...defaultAnim({
                                        initial: {
                                            y: "100%",
                                        },
                                        inView: {
                                            y: "0%",
                                        },
                                    })}
                                >
                                    Learn More
                                </motion.button>
                            </span>
                        </div>
                    </div>
                    <div className={css.divider} />
                    <TransparencySection />
                </div>
            </section>
        </>
    );
}

function TransparencySection() {
    const wrapperRef = useRef(null);
    const [animFirst, setAnimFirst] = useState(false);
    const [animSecond, setAnimSecond] = useState(false);
    const [animThird, setAnimThird] = useState(false);

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!animThird && latest > 0.6) {
            setAnimFirst(true);
            setAnimSecond(true);
            setAnimThird(true);
        } else if ((!animSecond && latest > 0.3) || (animThird && latest < 0.6)) {
            setAnimFirst(true);
            setAnimSecond(true);
            setAnimThird(false);
        } else if ((!animFirst && latest > 0.05) || (animSecond && latest < 0.3)) {
            setAnimFirst(true);
            setAnimSecond(false);
            setAnimThird(false);
        } else if (!!animFirst && latest < 0.05) {
            setAnimFirst(false);
            setAnimSecond(false);
            setAnimThird(false);
        }
    });

    return (
        <div ref={wrapperRef} className={css.stickySection}>
            <motion.div className={css.transparency}>
                <header>
                    <h1>Transparency</h1>
                    <h2>Life is too short to spend it negotiating</h2>
                    <p>
                        Our pricing is transparent and self-serve for all of plans, so you can save time and get back to
                        your finances.
                    </p>
                </header>
                <ul>
                    <motion.li
                        {...defaultAnim({
                            initial: {
                                x: "50%",
                                opacity: 0,
                            },
                            enter: {
                                x: "0%",
                                opacity: 1,
                            },
                        })}
                        animate={animFirst ? "enter" : "initial"}
                        transition={{ ...transition, delayChildren: duration, staggerChildren: staggerDelay }}
                    >
                        <IconComponent.SavingsIcon />
                        <motion.h3 variants={ChildrenVariant}>Affordable</motion.h3>
                        <motion.p variants={ChildrenVariant}>
                            Your most important resource is time and runway. This is always top of mind when we develop
                            new features and invest in our infrastructure.
                        </motion.p>
                    </motion.li>
                    <motion.li
                        {...defaultAnim({
                            initial: {
                                x: "50%",
                                opacity: 0,
                            },
                            enter: {
                                x: "0%",
                                opacity: 1,
                            },
                        })}
                        animate={animSecond ? "enter" : "initial"}
                        transition={{ ...transition, delayChildren: duration, staggerChildren: staggerDelay }}
                    >
                        <IconComponent.ConsistencyIcon />
                        <motion.h3 variants={ChildrenVariant}>Consistent</motion.h3>
                        <motion.p variants={ChildrenVariant}>
                            If you exceed your plan, you won't get hit with punitive overages. With our forgiveness
                            policy, we won't charge actions done by accident.
                        </motion.p>
                    </motion.li>
                    <motion.li
                        {...defaultAnim({
                            initial: {
                                x: "50%",
                                opacity: 0,
                            },
                            enter: {
                                x: "0%",
                                opacity: 1,
                            },
                        })}
                        animate={animThird ? "enter" : "initial"}
                        transition={{ ...transition, delayChildren: duration, staggerChildren: staggerDelay }}
                    >
                        <IconComponent.TargetIcon />
                        <motion.h3 variants={ChildrenVariant}>Simple</motion.h3>
                        <motion.p variants={ChildrenVariant}>
                            We know that you know that pricing is painful. We will never throw a curveball at you.
                        </motion.p>
                    </motion.li>
                </ul>
            </motion.div>
        </div>
    );
}

const ChildrenVariant: Variants = {
    initial: {
        opacity: 0,
        y: 100,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: { ...transition, type: "spring" },
    },
};

export type PlanCardData = {
    label: string;
    name: string;
    price: string;
    priceLabel: string;
    description: string;
    featuresTitle: string;
    features: string[];
    alt: boolean;
};

function PlanCard(props: PlanCardData) {
    return (
        <motion.div
            className={cn(
                css.planCard,
                props.alt ? css.alt : undefined,
                "bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-100)]"
            )}
            {...defaultAnim({
                initial: {
                    opacity: 0,
                    x: props.alt ? -100 : 100,
                },
                inView: {
                    opacity: 1,
                    x: 0,
                },
            })}
        >
            <div className={css.header}>
                <h2>{props.label}</h2>
            </div>
            <div className={css.body}>
                <h1>{props.name}</h1>
                <div className={css.divider} />
                <div className={css.priceRow}>
                    <p className={css.dollar}>{"$"}</p>
                    <p className={css.price}>{props.price}</p>
                    <div className={css.description}>
                        <p>{props.priceLabel}</p>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div className={css.divider} />
                <h3>{props.featuresTitle}</h3>
                <motion.ul>
                    {props.features.map((feature, index) => (
                        <motion.li
                            key={`feature_${index}`}
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
                        >
                            {feature}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
            <div className={css.footer}>
                <a href="/dashboard">
                    <button>Get Started</button>
                </a>
            </div>
        </motion.div>
    );
}
