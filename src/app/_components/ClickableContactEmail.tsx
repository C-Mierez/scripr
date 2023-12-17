"use client";

import { ContactEmail } from "../../utils/data";
import { useEffect, useState } from "react";
import css from "./ClickableContactEmail.module.scss";

export default function ClickableContactEmail() {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        let interval;
        if (isCopied) {
            interval = setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        } else {
            clearInterval(interval);
        }
    }, [isCopied]);

    const copy = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(ContactEmail);
    };

    return (
        <p className={isCopied ? css.clicked : css.clickable} onClick={isCopied ? null : copy}>
            {ContactEmail}
        </p>
    );
}
