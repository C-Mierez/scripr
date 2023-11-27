"use client";

import { CSSVariables } from "~/utils/utils";
import css from "./contactForm.module.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function ContactForm() {
    return (
        <form className={css.contactForm}>
            <div className={css.fields}>
                <TextField label={"Name"} description="Greetings, I am" required={true} />
                <TextField label={"Subject"} description="I am writing about" required={true} />
                <TextField label={"Email"} description="You can reach me at" required={true} />
                <TextField label={"Phone"} description="or at" required={false} />
                <TextArea label={"Your Message"} description="" required={true} />
                <RatingField label={"Stars"} description="I would also like to leave a rating of" required={true} />
                <button className={css.submit}>Submit</button>
            </div>
        </form>
    );
}

export function TextField(props: { label: string; description: string; required: boolean }) {
    return (
        <div className={css.fieldRow}>
            <p>{props.description}</p>
            <div className={css.textfield}>
                <input type="text" required={props.required} placeholder={`${props.label}${props.required ? "*" : ""}`} />
            </div>
        </div>
    );
}

export function TextArea(props: { label: string; description: string; required: boolean }) {
    // const [value, setValue] = useState("");

    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
        <div className={css.fieldRow}>
            <div ref={wrapperRef} className={CSSVariables(css.textfield, css.textarea)}>
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
        <div className={css.fieldRow}>
            <p>{props.description}</p>
            {Array.from({ length: 5 }).map((_, i) => (
                <input type="radio" name={`rating${props.label}`} className={CSSVariables(css.ratingField)} />
            ))}
        </div>
    );
}
