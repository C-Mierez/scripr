"use client";

import { useState } from "react";
import { CSSVariables } from "~/utils/utils";

import css from "../home.module.scss";
import ContactForm from "./home/ContactForm";
import ParallaxReviews from "./home/ParallaxReviews";
import SVGComponent from "./svg/SVG";
import IconComponent from "./svg/Icon";
import SegwaySection from "./home/section/SegwaySection";
import FeaturesSection from "./home/section/FeaturesSection";
import StatsSection from "./home/section/StatsSection";
import PricingSection from "./home/section/PricingSection";
import ComparisonSection from "./home/section/ComparisonSection";
import FAQSection from "./home/section/FAQSection";

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
            {/* <ContactSection /> */}
            {/* <AboutSection /> */}
            {/* <EndSection /> */}
            {/* <Footer /> */}
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

function ContactSection() {
    return (
        <>
            <header className={css.contact}>
                <h1 className={sharedCss.headerDecorated}>Reach Out</h1>
                <p>We would love to hear from you.</p>
            </header>
            <section className={css.contact}>
                <ContactForm />
                <div className={css.rowMain}>
                    <div className={css.callout}>
                        <h1>We are always looking to improve our service.</h1>
                        <p>If you have any suggestions, feedback or questions, please do not hesitate to send us a message!</p>
                    </div>
                    <div className={css.rate}>
                        <h2>Feel free to rate us</h2>
                        <Rating />
                    </div>
                </div>
                <div className={css.rowSmall}>
                    <p>Come on. We swear we don't bite.</p>
                    <ul className={css.socials}>
                        <li>
                            <SVGComponent.GitHubLogo />
                        </li>
                        <li>
                            <SVGComponent.XLogo />
                        </li>
                    </ul>
                </div>
                <div className={css.reviewSegway}>
                    <h1>Still not sure?</h1>
                    <p>See what other users think about us</p>
                </div>
                <ParallaxReviews />
                <div className={css.endLogo}>
                    <SVGComponent.ScriprLogo />
                </div>
            </section>
            <div className={css.parallaxSection}></div>
        </>
    );
}

function Rating() {
    return (
        <ul className={css.rating}>
            {[...Array(5)].map((_, index) => (
                <li key={`rating_${index}`}>
                    <SVGComponent.RatingStar />
                </li>
            ))}
        </ul>
    );
}

function ContactSegwaySection() {
    return (
        <>
            <header className={css.contactSegway}>
                <h1>Got any more questions?</h1>
                <h2>Or perhaps you just want to say Hi?</h2>
            </header>
        </>
    );
}
