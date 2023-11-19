import SVGComponent from "../../svg/SVG";
import css from "./SegwaySection.module.scss";

export default function SegwaySection() {
    return (
        <section className={css.segway}>
            <h2 className={css.header}>A finance management and analysis tool</h2>
            <p className={css.phrase}>Our way to help as many people as possible take control of their finances.</p>
            <SVGComponent.ScriprLogo />
        </section>
    );
}
