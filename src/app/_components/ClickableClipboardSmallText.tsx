"use client";

import { ContactEmail } from "../../lib/data";
import { useEffect, useState } from "react";
import css from "./ClickableClipboardSmallText.module.scss";

export default function ClickableClipboardSmallText() {
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
        <p className={isCopied ? css.clicked : css.clickable} onClick={isCopied ? () => {} : copy}>
            {ContactEmail}
        </p>
    );
}
