"use client";

import { useRef } from "react";
import css from "./parallaxReviews.module.scss";
import useDimensions from "~/hooks/useDimensions";
import { useScroll, useTransform, motion } from "framer-motion";
import SVGComponent from "../svg/SVG";

export default function ParallaxReviews() {
    const reviews: ReviewData[] = [
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Affordable",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
        {
            title: "Great service!",
            review: "I had a great experience with this company. They were very professional and did an excellent job. I highly recommend them!",
            rating: 5,
        },
    ];

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
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} {...review} />
                    ))}
                </motion.div>
            ))}
        </section>
    );
}

type ReviewData = {
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
