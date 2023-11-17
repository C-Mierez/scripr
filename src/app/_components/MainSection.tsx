"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { CSSVariables } from "~/utils/utils";

import css from "../home.module.scss";
import ContactForm from "./home/ContactForm";
import ParallaxReviews from "./home/ParallaxReviews";
import SVGComponent from "./svg/SVG";
import IconComponent from "./svg/Icon";

export default function MainSection() {
    // Main Body padding animation on scroll
    const { scrollY: viewportScrollY } = useScroll();
    const padding = useTransform(viewportScrollY, [0, 300], ["1.5lvh", "0lvh"]);

    return (
        <motion.div className={css.stickyWrapper} style={{ paddingInline: padding }}>
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
        </motion.div>
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
                <h1 className={css.headerDecorated}>Take Back</h1>
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
                <h1 className={css.headerDecorated}>About Us</h1>
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
                <h1 className={css.headerDecorated}>Reach Out</h1>
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

function FAQSection() {
    const faqCards = [
        {
            question: "What is a record?",
            answer: "A record is a single entry in your accounting. It can be a transaction, an investment, a loan, a debt, an expense, etc.",
        },
        {
            question: "What is a link?",
            answer: "A link is a connection between two records. Each link has a type, which defines the nature of the connection.",
        },
        {
            question: "How does our pricing work?",
            answer: "Our transparent and self-serve model allows you to start small to keep your initial costs down and scale your analytics confidently as you grow. There are no overages if you exceed your plan, you simply pay for additional upgrades on the same cost per feature basis. You can go with one of our premade plans. Or if you need more help customizing an option that works for you, reach out to our sales team.",
        },
        {
            question: "How can I estimate my amount of links?",
            answer: "We recommend you to start with the Starter plan and upgrade to the Investor plan if you need more links. You can also build your own plan if you need more links but not the other features of the Investor plan.",
        },
        {
            question: "Can I go over my plan limits?",
            answer: "Yes, you can go over your plan limits. You will be charged for the extra links you use at the same cost per link as your plan. You can also upgrade to a higher plan if you need more links.",
        },
        {
            question: "I am a student. Can I get a discount?",
            answer: "Yes, we offer a free premium trial for your first year of use. Contact us to get your discount.",
        },
        { question: "Can I ask for my money back?", answer: "No." },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription at any time. You will still have access to your account until the end of your billing period.",
        },
    ];

    return (
        <section className={css.faq}>
            <div className={css.stickyGrid}>
                <header>
                    <h1>Frequently</h1>
                    <h2>Asked Questions</h2>
                </header>
                <div className={css.content}>
                    {faqCards.map((card, index) => (
                        <FAQCard key={`faqCard_${index}`} question={card.question} answer={card.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQCard(props: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={css.faqCard}>
            <div className={css.content}>
                <h3>{props.question}</h3>
                <div className={css.icon} onClick={() => setIsOpen(!isOpen)}>
                    <IconComponent.ExpandDropdown />
                </div>
            </div>
            <div className={CSSVariables(css.answer, isOpen ? css.open : undefined)}>
                <p>{props.answer}</p>
            </div>
        </div>
    );
}

function ComparisonSection() {
    const tableGroups: TableGroupData[] = [
        {
            title: "Features",
            rows: [
                { label: "Unlimited records", starter: true, investor: true },
                { label: "Unlimited links", starter: "20", investor: true },
                { label: "Unlimited custom assets", starter: "10", investor: true },
                { label: "Early Access to new features", starter: false, investor: true },
            ],
        },
        {
            title: "Data and Usage",
            rows: [
                { label: "Saved Records", starter: true, investor: true },
                { label: "Data Backup", starter: "< 30 days", investor: true },
            ],
        },
        {
            title: "Privacy and Security",
            rows: [
                { label: "Two-Factor Authentication", starter: true, investor: true },
                { label: "Data Encryption", starter: false, investor: true },
            ],
        },
        {
            title: "Customer Support",
            rows: [
                { label: "Documentation", starter: true, investor: true },
                { label: "Email Support", starter: true, investor: true },
                { label: "Live Chat", starter: false, investor: true },
                { label: "Priority Response Time", starter: false, investor: true },
                { label: "Dedicated Account Manager", starter: false, investor: true },
                { label: "Discord Community", starter: true, investor: true },
            ],
        },
    ];
    return (
        <section className={css.comparison}>
            <div className={css.tableHeader}>
                {/* <div className={css.border} /> */}
                <div className={css.headerWrapper}>
                    <div className={css.tableFirst}></div>
                    <div className={css.tableCard}>
                        <h2>It's free</h2>
                        <h1>Starter</h1>
                        <button>Get Started</button>
                    </div>
                    <div className={css.tableCard}>
                        <h2>{"$20/ month"}</h2>
                        <h1>Investor</h1>
                        <button>Get Started</button>
                    </div>
                </div>
            </div>
            {/* <div className={css.tableSeparator}></div> */}
            <div className={css.tableBody}>
                {tableGroups.map((group, index) => (
                    <TableGroup key={`tableGroup_${index}`} title={group.title} rows={group.rows} />
                ))}
            </div>
        </section>
    );
}
type TableGroupData = {
    title: string;
    rows: TableRowData[];
};

type TableRowData = {
    label: string;
    starter: boolean | string;
    investor: boolean | string;
};

function TableGroup(props: TableGroupData) {
    return (
        <div className={css.tableGroup}>
            <h1>{props.title}</h1>
            {props.rows.map((row, index) => (
                <div className={css.tableRow} key={`tableRow_${index}`}>
                    <div className={css.tableFirst}>{row.label}</div>
                    <div className={css.tableColumn}>
                        {typeof row.starter === "boolean" ? (
                            row.starter ? (
                                <IconComponent.SupportedIcon />
                            ) : (
                                <IconComponent.UnsupportedIcon />
                            )
                        ) : (
                            <p>{row.starter}</p>
                        )}
                    </div>
                    <div className={css.tableColumn}>
                        {typeof row.investor === "boolean" ? (
                            row.investor ? (
                                <IconComponent.SupportedIcon />
                            ) : (
                                <IconComponent.UnsupportedIcon />
                            )
                        ) : (
                            <p>{row.investor}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function PricingSection() {
    const plans: PlanCardData[] = [
        {
            label: "Try it Out",
            name: "Starter",
            price: "0",
            priceLabel: "Forever",
            description: "Essential features for casual use.",
            featuresTitle: "Access to:",
            features: ["Unlimited records.", "20 links / month.", "3 starting templates.", "10 custom assets."],
            alt: true,
        },
        {
            label: "Best Deal",
            name: "Investor",
            price: "20",
            priceLabel: "/ month",
            description: "Use with no limitations.",
            featuresTitle: "All Starter features, plus:",
            features: ["Unlimited links.", "10 starting templates.", "Unlimited custom assets.", "Access to in-depth analytics.", "Premium support."],
            alt: false,
        },
    ];

    return (
        <>
            <header className={css.pricing}>
                <h1 className={css.headerDecorated}>Pricing</h1>
                <h2>Choose a plan that suits your needs</h2>
            </header>
            <section className={css.pricing}>
                <div className={css.grid}>
                    {plans.map((plan, index) => (
                        <PlanCard
                            key={`plan_${index}`}
                            label={plan.label}
                            name={plan.name}
                            price={plan.price}
                            priceLabel={plan.priceLabel}
                            description={plan.description}
                            featuresTitle={plan.featuresTitle}
                            features={plan.features}
                            alt={plan.alt}
                        />
                    ))}
                </div>
                <h2>Or build your own</h2>
                <div className={css.grid}>
                    {plans.map((plan, index) => (
                        <PlanCard
                            key={`plan_${index}`}
                            label={plan.label}
                            name={plan.name}
                            price={plan.price}
                            priceLabel={plan.priceLabel}
                            description={plan.description}
                            featuresTitle={plan.featuresTitle}
                            features={plan.features}
                            alt={plan.alt}
                        />
                    ))}
                </div>
                <div className={css.contentWrapper}>
                    <div className={css.divider} />
                    <div className={css.deals}>
                        <div className={css.deal}>
                            <h2>A plan for everyone</h2>
                            <p>
                                We ensure every customer gets pricing that aligns to their budget and business needs. Consult with our sales team to choose the
                                best option for you.
                            </p>
                            <button>Contact Sales</button>
                        </div>
                        <div className={css.deal}>
                            <h2>Are you a student?</h2>
                            <p>
                                {
                                    "We acknowledge that 20$ a year is probably a bit too much for your Mc Donald’s salary. We can provide you with a premium trial for your first year of use. "
                                }
                            </p>
                            <button>Learn More</button>
                        </div>
                    </div>
                    <div className={css.divider} />
                    <div className={css.transparency}>
                        <header>
                            <h1>Transparency</h1>
                            <h2>Life is too short to spend it negotiating</h2>
                            <p>Our pricing is transparent and self-serve for all of plans, so you can save time and get back to your finances.</p>
                        </header>
                        <ul>
                            <li>
                                <h3>Affordable</h3>
                                <p>
                                    Your most important resource is time and runway. This is always top of mind when we develop new features and invest in our
                                    infrastructure.
                                </p>
                            </li>
                            <li>
                                <h3>Consistent</h3>
                                <p>
                                    If you exceed your plan, you won't get hit with punitive overages. With our forgiveness policy, we won't charge actions done
                                    by accident.
                                </p>
                            </li>
                            <li>
                                <h3>Simple</h3>
                                <p>We know that you know that pricing is painful. We will never throw a curveball at you.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

type PlanCardData = {
    label: string;
    name: string;
    price: string;
    priceLabel: string;
    description: string;
    featuresTitle: string;
    features: string[];
    alt: boolean;
};

function PlanCard(props: PlanCardData) {
    return (
        <div className={CSSVariables(css.plan, props.alt ? css.alt : undefined)}>
            <div className={css.header}>
                <h2>{props.label}</h2>
            </div>
            <div className={css.body}>
                <h1>{props.name}</h1>
                <div className={css.divider}></div>
                <div className={css.priceRow}>
                    <p className={css.dollar}>{"$"}</p>
                    <p className={css.price}>{props.price}</p>
                    <div className={css.description}>
                        <p>{props.priceLabel}</p>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div className={css.divider}></div>
                <h3>{props.featuresTitle}</h3>
                <ul>
                    {props.features.map((feature, index) => (
                        <li key={`feature_${index}`}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className={css.footer}>
                <button>Get Started</button>
            </div>
        </div>
    );
}

function StatsSection() {
    const stats: StatsCardData[] = [
        { label: "Assets Tracked", value: "45+" },
        { label: "Existing Records", value: "1k" },
        { label: "Total Value", value: "$600k" },
    ];
    return (
        // <div className={css.testWrapper}>

        <section className={css.stats}>
            <header className={css.stats}>
                <h1>WITH MORE THAN</h1>
                <p>2</p>
                <h1>SATISFIED CLIENTS</h1>
            </header>
            <div className={css.grid}>
                {stats.map((stat, index) => (
                    <StatsCard key={`stat_${index}`} label={stat.label} value={stat.value} />
                ))}
            </div>
            <div className={css.disclaimer}>
                <p>{"* (Not real values, please don't sue)"}</p>
            </div>
        </section>

        // </div>
    );
}

type StatsCardData = {
    label: string;
    value: string;
};

function StatsCard(props: StatsCardData) {
    return (
        <div className={css.stat}>
            <p>{props.value}</p>
            <h2>{props.label}</h2>
        </div>
    );
}

function FeaturesSection() {
    const features: FeatureData[] = [
        { title: "Track", description: "Follow the state of all your open positions with live and manual price tracking." },
        { title: "Organize", description: "Keep every kind of asset or operation in its place, as your see fit." },
        { title: "Link", description: "Connect operations, investments, expenses and income to each other." },
        { title: "Analyze", description: "Exploit your data to make better decisions and improve your finances." },
    ];
    return (
        <>
            <header className={css.features}>
                <h1 className={css.headerDecorated}>Features</h1>
                <p>We have a wide variety of functionality and financial instruments at your disposal to make your accounting easier.</p>
            </header>
            <section className={css.features}>
                <div className={css.stickyGrid}>
                    <header>
                        <h1>Plenty of tools</h1>
                        <h2>at your disposal</h2>
                    </header>
                    <div className={css.content}>
                        {features.map((feature, index) => (
                            <FeatureElement key={`feature_${index}`} title={feature.title} description={feature.description} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

type FeatureData = {
    title: string;
    description: string;
};

function FeatureElement(props: FeatureData) {
    return (
        <div className={css.feature}>
            <div className={css.image}>
                <div />
            </div>
            <div className={css.data}>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

function SegwaySection() {
    return (
        <section className={css.segway}>
            <div className={css.card}>
                <h2 className={css.header}>A finance management and analysis tool</h2>
                <p className={css.phrase}>Our way to help as many people as possible take control of their finances.</p>
                <SVGComponent.ScriprLogo />
            </div>
        </section>
    );
}
