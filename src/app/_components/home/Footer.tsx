import SVGComponent from "../svg/SVG";
import css from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={css.footer}>
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
