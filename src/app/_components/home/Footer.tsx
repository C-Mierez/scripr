import { cn } from "~/lib/utils";
import SVGComponent from "../svg/SVG";
import css from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer
            className={cn(
                css.footer,
                "bg-gradient-to-t from-[var(--color-primary-800)] to-[var(--color-primary-700)] dark:from-[var(--color-primary-50)] dark:to-[var(--color-primary-100)]"
            )}
        >
            <div className={css.brand}>
                <SVGComponent.ScriprLogoFull />
            </div>
            <div className={css.separator}></div>
            <div className={css.legals}>
                <p>© 2023 C. Mierez | All Rights Reserved | Made For Personal Use</p>
            </div>
        </footer>
    );
}
