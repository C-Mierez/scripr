import css from "./PricingSection.module.scss";
import sharedCss from "../shared.module.scss";
import { CSSVariables } from "~/utils/utils";
import { Content } from "~/utils/data";
import CustomPlanCard from "../CustomPlanCard";
import IconComponent from "../../svg/Icon";

export default function PricingSection() {
    return (
        <>
            <header className={css.pricing}>
                <h1 className={sharedCss.headerDecorated}>Pricing</h1>
                <h2>Choose a plan that suits you best</h2>
            </header>
            <section className={css.pricing}>
                <div className={css.planCardGrid}>
                    {Content.Plans.PlansCardData.map((plan, index) => (
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
                <div className={css.planCardGrid}>
                    <CustomPlanCard />
                </div>
                <div className={css.contentWrapper}>
                    <div className={css.divider} />
                    <div className={css.deals}>
                        <div className={css.deal}>
                            <h2>A plan for everyone</h2>
                            <p>
                                We ensure every customer gets pricing that aligns to their budget and business needs.
                                Consult with our sales team to assist you with choosing the best options for you.
                            </p>
                            <button>Contact Sales</button>
                        </div>
                        <div className={css.deal}>
                            <h2>Are you a student?</h2>
                            <p>
                                {
                                    "We acknowledge that 20$ a year is probably a bit too much for your McDonald's salary. We can provide you with a premium trial for your first year of use. "
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
                            <p>
                                Our pricing is transparent and self-serve for all of plans, so you can save time and get
                                back to your finances.
                            </p>
                        </header>
                        <ul>
                            <li>
                                <IconComponent.SavingsIcon />
                                <h3>Affordable</h3>
                                <p>
                                    Your most important resource is time and runway. This is always top of mind when we
                                    develop new features and invest in our infrastructure.
                                </p>
                            </li>
                            <li>
                                <IconComponent.ConsistencyIcon />
                                <h3>Consistent</h3>
                                <p>
                                    If you exceed your plan, you won't get hit with punitive overages. With our
                                    forgiveness policy, we won't charge actions done by accident.
                                </p>
                            </li>
                            <li>
                                <IconComponent.TargetIcon />
                                <h3>Simple</h3>
                                <p>
                                    We know that you know that pricing is painful. We will never throw a curveball at
                                    you.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export type PlanCardData = {
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
        <div className={CSSVariables(css.planCard, props.alt ? css.alt : undefined)}>
            <div className={css.header}>
                <h2>{props.label}</h2>
            </div>
            <div className={css.body}>
                <h1>{props.name}</h1>
                <div className={css.divider} />
                <div className={css.priceRow}>
                    <p className={css.dollar}>{"$"}</p>
                    <p className={css.price}>{props.price}</p>
                    <div className={css.description}>
                        <p>{props.priceLabel}</p>
                        <p>{props.description}</p>
                    </div>
                </div>
                <div className={css.divider} />
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
