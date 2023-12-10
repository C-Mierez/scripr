import css from "./AboutSection.module.scss";
import sharedCss from "../shared.module.scss";
import { CSSVariables } from "~/utils/utils";

export default function AboutSection() {
    return (
        <>
            <header className={css.about}>
                <h1 className={CSSVariables(sharedCss.headerDecorated, sharedCss.alt)}>About Us</h1>
                <p>
                    We're a small but mighty team of people who are all about helping to make finance less overwhelming
                    and more accessible to people
                </p>
            </header>

            <section className={css.about}>
                <div className={css.timelineGrid}>
                    <div />
                    <div className={css.timeline} />
                    <div className={css.timelineContent}>
                        <p>We know that keeping track of your money can be a hassle.</p>
                        <p>Our goal is to help as many people as possible take control of their finances.</p>
                    </div>
                </div>

                <h2>
                    So we've combined finance tracking and data analysis all in one place.
                    <div className={css.progressBar}></div>
                </h2>

                <div className={css.textScroller}>
                    <h3>INVESTMENTS</h3>
                </div>

                <div className={css.timelineGrid}>
                    <div />
                    <div className={css.timeline}></div>
                    <div className={css.timelineContent}>
                        <p>
                            We believe that everyone should have access to the tools and information they need to make
                            smart financial moves.
                        </p>
                        <p>
                            We strive to provide a clearer view of your financial picture, allowing you to take control
                            of your finance.
                        </p>
                    </div>
                </div>

                <h1>
                    What are you waiting for?
                    <div className={css.progressBar}></div>
                </h1>
            </section>
        </>
    );
}
