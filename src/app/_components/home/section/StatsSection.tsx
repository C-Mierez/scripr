import { Content } from "~/lib/data";
import css from "./StatsSection.module.scss";

export default function StatsSection() {
    return (
        <section className={css.stats}>
            <div className={css.statsWrapper}>
                <header className={css.clients}>
                    <h1>WITH MORE THAN</h1>
                    <p>2</p>
                    <h1>SATISFIED CLIENTS</h1>
                </header>
                <div className={css.cardGrid}>
                    {Content.Stats.StatsCardData.map((stat, index) => (
                        <StatsCard key={`stat_${index}`} label={stat.label} value={stat.value} />
                    ))}
                </div>
                <div className={css.disclaimer}>
                    <p>{"* (Not real values, please don't sue)"}</p>
                </div>
            </div>
        </section>
    );
}

export type StatsCardData = {
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
