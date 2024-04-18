"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { cn } from "~/lib/utils";

import { defaultAnim, duration, staggerDelay, transition } from "../../../lib/animations";
import css from "./contactForm.module.scss";
import { isMobile } from "react-device-detect";

export default function ContactForm() {
    return (
        <form className={css.contactForm}>
            <motion.div
                className={css.fields}
                /* ------------------------------ FramerMotion ------------------------------ */
                {...defaultAnim({})}
            >
                <TextField label={"Name"} description="Greetings, I am" required={true} />
                <TextField label={"Subject"} description="I am writing about" required={true} />
                <TextField label={"Email"} description="You can reach me at" required={true} />
                <TextField label={"Phone"} description="or at" required={false} />
                <TextArea label={"Your Message"} description="" required={true} />
                <RatingField label={"Stars"} description="I would like to leave a rating of" required={true} />
                <button className={css.submit}>Submit</button>
            </motion.div>
        </form>
    );
}

export function TextField(props: { label: string; description: string; required: boolean }) {
    return (
        <motion.div
            className={css.fieldRow}
            /* ------------------------------ FramerMotion ------------------------------ */
            {...defaultAnim({
                initial: { opacity: 0 },
                inView: {
                    opacity: 1,
                },
            })}
        >
            <p>{props.description}</p>
            <motion.div
                className={css.textfield}
                /* ------------------------------ FramerMotion ------------------------------ */
                {...defaultAnim({
                    initial: { width: isMobile ? "100%" : "0%" },
                    inView: {
                        width: "100%",
                    },
                })}
                transition={{ ...transition, delay: duration * 0.5 }}
            >
                <input
                    type="text"
                    required={props.required}
                    placeholder={`${props.label}${props.required ? "*" : ""}`}
                />
            </motion.div>
        </motion.div>
    );
}

export function TextArea(props: { label: string; description: string; required: boolean }) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
        <div className={css.fieldRow}>
            <motion.div
                className={css.revealer}
                /* ------------------------------ FramerMotion ------------------------------ */
                {...defaultAnim({
                    initial: { scaleX: 1 },
                    inView: {
                        scaleX: 0,
                    },
                })}
                transition={{ ...transition, delay: duration * 0.5 }}
            ></motion.div>
            <div ref={wrapperRef} className={cn(css.textfield, css.textarea)}>
                <textarea
                    required={props.required}
                    placeholder={`${props.label}${props.required ? "*" : ""}`}
                    // value={value}
                    rows={1}
                    onChange={(e) => {
                        wrapperRef.current!.dataset.replicatedValue = e.target.value;
                        // setValue(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

function RatingField(props: { label: string; description: string; required: boolean }) {
    return (
        <motion.div
            className={cn(css.fieldRow, "mt-4")}
            /* ------------------------------ FramerMotion ------------------------------ */
            {...defaultAnim({
                initial: { opacity: 0 },
                inView: {
                    opacity: 1,
                },
            })}
            transition={{
                ...transition,
                delay: duration * 0.5,
            }}
        >
            <p>{props.description}</p>
            <div className={css.ratingRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <React.Fragment key={`rating${i}`}>
                        <input
                            type="radio"
                            id={`star${i}`}
                            name={`rating${props.label}`}
                            onChange={(e) => {
                                e.preventDefault();
                            }}
                            className={cn(css.ratingField)}
                        />
                        <motion.label
                            htmlFor={`star${i}`}
                            /* ------------------------------ FramerMotion ------------------------------ */
                            {...defaultAnim({
                                inView: {
                                    color: "var(--color-success)",
                                    rotate: [0, 45, -25, 0],
                                },
                            })}
                            transition={{
                                ...transition,
                                delay: duration + (5 - i) * staggerDelay,
                            }}
                        />
                    </React.Fragment>
                ))}
            </div>
            <p>&nbsp;stars.</p>
        </motion.div>
    );
}
