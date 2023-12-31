import css from "./AuthHero.module.scss";

interface AuthHeroProps {
    label: string;
    header: string;
    subheader: string;
}

export default function AuthHero({ label, header, subheader }: AuthHeroProps) {
    return (
        <section className={css.hero}>
            <div className={css.label}>{label}</div>
            <h1 className={css.header}>{header}</h1>
            <p className={css.subheader}>{subheader}</p>
        </section>
    );
}
