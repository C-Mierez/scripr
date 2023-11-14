"use client";

import { useRef } from "react";
import css from "./parallaxReviews.module.scss";
import useDimensions from "~/hooks/useDimensions";
import { useScroll, useTransform, motion } from "framer-motion";

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
                    <svg
                        key={`star ${title}_${i}`}
                        className={i < rating ? css.filled : ""}
                        width="27"
                        height="25"
                        viewBox="0 0 27 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M13.5 0L16.5309 9.32827H26.3393L18.4042 15.0935L21.4351 24.4217L13.5 18.6565L5.5649 24.4217L8.59584 15.0935L0.660737 9.32827H10.4691L13.5 0Z" />
                    </svg>
                ))}
            </div>
        </div>
    );
}
