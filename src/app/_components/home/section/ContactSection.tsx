import css from "./ContactSection.module.scss";
import sharedCss from "../shared.module.scss";
import ContactForm from "../ContactForm";
import SVGComponent from "../../svg/SVG";
import ParallaxReviews from "../ParallaxReviews";

export default function ContactSection() {
    return (
        <>
            <header className={css.contact}>
                <h1 className={sharedCss.headerDecorated}>Reach Out</h1>
                <p>We would love to hear from you.</p>
            </header>
            <section className={css.contact}>
                <ContactForm />

                <div className={css.reviewSegway}>
                    <h1>Still not sure?</h1>
                    <p>See what other users think about us</p>
                </div>

                <ParallaxReviews />

                <div className={css.endLogo}>
                    <SVGComponent.ScriprLogo />
                </div>
            </section>
        </>
    );
}
