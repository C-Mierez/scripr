"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useDimensions from "~/hooks/useDimensions";

import SVGComponent from "../svg/SVG";
import css from "./parallaxReviews.module.scss";
import { Content } from "~/lib/data";

export default function ParallaxReviews() {
    const parallaxRef = useRef(null);

    const { height } = useDimensions();

    const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });

    const yValues = [
        useTransform(scrollYProgress, [0, 1], [0, height]),
        useTransform(scrollYProgress, [0, 1], [0, height * 1.8]),
        useTransform(scrollYProgress, [0, 1], [0, height * 1.1]),
        useTransform(scrollYProgress, [0, 1], [0, height * 1.3]),
    ];

    return (
        <section ref={parallaxRef} className={css.parallaxReviews}>
            {Array.from({ length: 4 }, (_, i) => (
                <motion.div key={i} className={css.column} style={{ y: yValues[i] }}>
                    {Content.Reviews.ReviewCardData.map((review, i) => (
                        <ReviewCard key={i} {...review} />
                    ))}
                </motion.div>
            ))}
        </section>
    );
}

export type ReviewData = {
    title: string;
    review: string;
    rating: number;
};

function ReviewCard({ title, review, rating }: ReviewData) {
    return (
        <div className={css.reviewCard}>
            <h2>{title}</h2>
            <p>{review}</p>
            <div className={css.rating}>
                {Array.from({ length: 5 }, (_, i) => (
                    <div key={`star ${title}_${i}`} className={i < rating ? css.filled : ""}>
                        <SVGComponent.RatingStar />
                    </div>
                ))}
            </div>
        </div>
    );
}
