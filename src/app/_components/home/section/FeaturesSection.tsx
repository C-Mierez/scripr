"use client";

import { Content } from "~/lib/data";
import css from "./FeaturesSection.module.scss";
import sharedCss from "../shared.module.scss";
import { AnchorIDs } from "../../../../lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { defaultAnim, transition } from "~/lib/animations";

export default function FeaturesSection() {
    const featuresRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: featuresRef, offset: ["start center", "end center"] });

    return (
        <>
            <div className={sharedCss.anchor} id={AnchorIDs.Features} />
            <header className={css.features}>
                <h1 className={sharedCss.headerDecorated}>Features</h1>
                <p>
                    We have a wide variety of functionality and financial instruments at your disposal to make your
                    accounting easier.
                </p>
            </header>
            <section className={css.features}>
                <div ref={featuresRef} className={css.stickyGrid}>
                    <header>
                        <h1>Plenty of tools</h1>
                        <h2>at your disposal</h2>
                        <motion.div className={css.progressBar} style={{ scaleX: scrollYProgress }} />
                    </header>
                    <div className={css.content}>
                        {Content.Features.FeatureData.map((feature, index) => (
                            <FeatureElement
                                key={`feature_${index}`}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export type FeatureData = {
    title: string;
    description: string;
};

function FeatureElement(props: FeatureData) {
    return (
        <motion.div
            className={css.feature}
            {...defaultAnim({
                initial: {
                    opacity: 0,
                    x: 100,
                },
                inView: {
                    opacity: 1,
                    x: 0,
                },
            })}
        >
            <div className={css.image}>
                <div />
            </div>
            <div className={css.data}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </motion.div>
    );
}
