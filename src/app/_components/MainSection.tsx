import css from "../home.module.scss";
import sharedCss from "../_components/home/shared.module.scss";
import ContactForm from "./home/ContactForm";
import ParallaxReviews from "./home/ParallaxReviews";
import ComparisonSection from "./home/section/ComparisonSection";
import ContactSegwaySection from "./home/section/ContactSegwaySection";
import FAQSection from "./home/section/FAQSection";
import FeaturesSection from "./home/section/FeaturesSection";
import PricingSection from "./home/section/PricingSection";
import SegwaySection from "./home/section/SegwaySection";
import StatsSection from "./home/section/StatsSection";
import SVGComponent from "./svg/SVG";
import ContactSection from "./home/section/ContactSection";

export default function MainSection() {
    return (
        <div className={css.stickyWrapper}>
            <SegwaySection />
            <FeaturesSection />
            <StatsSection />
            <PricingSection />
            <ComparisonSection />
            <FAQSection />
            <ContactSegwaySection />
            <ContactSection />
            <AboutSection />
            <EndSection />
            <Footer /> 
        </div>
    );
}
function Footer() {
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

function EndSection() {
    return (
        <section className={css.end}>
            <div className={css.cta}>
                <h1 className={sharedCss.headerDecorated}>Take Back</h1>
                <button>Get Started</button>
                <h1>Your Control</h1>
            </div>
            <div className={css.foot}>
                <p>
                    <a href="\">Terms of Service</a> and <a href="\">Privacy Policy</a>
                </p>
                <p>{"hello@scripr.com"}</p>
                <ul>
                    <li>
                        <SVGComponent.GitHubLogo />
                    </li>
                    <li>
                        <SVGComponent.XLogo />
                    </li>
                </ul>
            </div>
        </section>
    );
}

function AboutSection() {
    return (
        <>
            <header className={css.about}>
                <h1 className={sharedCss.headerDecorated}>About Us</h1>
                <p>We're a small but mighty team of people who are all about helping to make finance less overwhelming and more accessible to people</p>
            </header>
            <section className={css.about}>
                <div className={css.timelineGrid}>
                    <div />
                    <div className={css.timeline}></div>
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
                    h1
                </div>

                <div className={css.timelineGrid}>
                    <div />
                    <div className={css.timeline}></div>
                    <div className={css.timelineContent}>
                        <p>We believe that everyone should have access to the tools and information they need to make smart financial moves.</p>
                        <p>We strive to provide a clearer view of your financial picture, allowing you to take control of your finance.</p>
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
