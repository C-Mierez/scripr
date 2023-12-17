import { Content } from "~/utils/data";
import css from "./FeaturesSection.module.scss";
import sharedCss from "../shared.module.scss";
import { AnchorIDs } from "../../../../utils/data";

export default function FeaturesSection() {
    return (
        <>
            <div className={sharedCss.anchor} id={AnchorIDs.Features} />
            <header className={css.features}>
                <h1 className={sharedCss.headerDecorated}>Features</h1>
                <p>
                    We have a wide variety of functionality and financial instruments at your disposal to make your
                    accounting easier.
                </p>
            </header>
            <section className={css.features}>
                <div className={css.stickyGrid}>
                    <header>
                        <h1>Plenty of tools</h1>
                        <h2>at your disposal</h2>
                    </header>
                    <div className={css.content}>
                        {Content.Features.FeatureData.map((feature, index) => (
                            <FeatureElement
                                key={`feature_${index}`}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export type FeatureData = {
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
