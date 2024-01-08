"use client";

import { useEffect, useState } from "react";
import css from "./CustomPlanCard.module.scss";
import ValueSlider from "../inputs/ValueSlider";
import ValueCheckbox from "../inputs/ValueCheckbox";
import { CSSVariables } from "~/utils/utils";

export default function CustomPlanCard() {
    const [currentPrice, setCurrentPrice] = useState(1);
    const [currentLinks, setCurrentLinks] = useState(20);
    const [currentAssets, setCurrentAssets] = useState(5);
    const [hasEarlyAccess, setHasEarlyAccess] = useState(false);
    const [hasEncryption, setHasEncryption] = useState(false);
    const [hasPremiumSupport, setHasPremiumSupport] = useState(false);
    const pricePerLink = 0.01;
    const pricePerAsset = 0.2;
    const priceEarlyAccess = 1;
    const priceEncryption = 1;
    const pricePremiumSupport = 3;

    const updateCurrentPrice = () => {
        const newPrice =
            currentLinks * pricePerLink +
            currentAssets * pricePerAsset +
            (hasEarlyAccess ? priceEarlyAccess : 0) +
            (hasEncryption ? priceEncryption : 0) +
            (hasPremiumSupport ? pricePremiumSupport : 0);
        setCurrentPrice(newPrice);
        return newPrice;
    };

    useEffect(() => {
        updateCurrentPrice();
    });

    return (
        <div
            className={CSSVariables(
                css.customPlanCard,
                "bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-100)]"
            )}
        >
            <div className={css.header}>
                <h2>Your Plan</h2>
            </div>
            <div className={css.body}>
                <h1>Custom</h1>
                <div className={css.divider} />
                <div
                    className={CSSVariables(
                        css.priceRow,
                        "bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-100)]"
                    )}
                >
                    <p className={css.dollar}>{"$"}</p>
                    <p className={css.price}>{currentPrice.toFixed(0)}</p>
                    <div className={css.description}>
                        <p>{"/ month"}</p>
                        <p>Tailored to your own needs.</p>
                    </div>
                </div>
                <div className={css.divider} />
                <h3>Choose your features:</h3>
                <ul>
                    <li>
                        <ValueSlider
                            title={"Links"}
                            label={"links per month."}
                            maxValueLabel="Unlimited"
                            min={20}
                            max={500}
                            step={20}
                            value={currentLinks}
                            onChange={(e) => {
                                setCurrentLinks(parseInt(e.target.value));
                                updateCurrentPrice();
                            }}
                        />
                    </li>
                    <li>
                        <ValueSlider
                            title={"Custom Assets"}
                            label={"custom assets per portfolio."}
                            maxValueLabel="Unlimited"
                            min={5}
                            max={50}
                            step={5}
                            value={currentAssets}
                            onChange={(e) => {
                                setCurrentAssets(parseInt(e.target.value));
                                updateCurrentPrice();
                            }}
                        />
                    </li>

                    <li>
                        <ValueCheckbox
                            title={"Encryption"}
                            label={"Encrypt your data."}
                            value={hasEncryption}
                            onChange={(e) => setHasEncryption(e.target.checked)}
                        />
                    </li>
                    <li>
                        <ValueCheckbox
                            title={"Premium Support"}
                            label={"Get premium support."}
                            value={hasPremiumSupport}
                            onChange={(e) => setHasPremiumSupport(e.target.checked)}
                        />
                    </li>
                    <li>
                        <ValueCheckbox
                            title={"Early Access"}
                            label={"Get early access to new features."}
                            value={hasEarlyAccess}
                            onChange={(e) => setHasEarlyAccess(e.target.checked)}
                        />
                    </li>
                </ul>
            </div>
            <div className={css.footer}>
                <button>Get Started</button>
            </div>
        </div>
    );
}
