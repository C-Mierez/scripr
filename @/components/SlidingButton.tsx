import { CSSVariables } from "~/utils/utils";
import css from "./SlidingButton.module.scss";

export interface SlidingButtonProps {
    label: string;
    href: string;
}

export default function SlidingButton(props: SlidingButtonProps) {
    return (
        <a
            href={props.href}
            className={CSSVariables("py-2.5 px-4 bg-secondary text-2xl font-medium", css.slidingButton)}
        >
            {props.label}
        </a>
    );
}
