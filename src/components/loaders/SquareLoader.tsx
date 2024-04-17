import { CSSVariables } from "~/utils/utils";
import css from "./Loaders.module.scss";

export default function SquareLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizeClass = size === "sm" ? css.sm : size === "md" ? css.md : css.lg;

    return (
        <div className={CSSVariables(css.squareWrapper, sizeClass)}>
            <div className={css.squareLoader}></div>
        </div>
    );
}
