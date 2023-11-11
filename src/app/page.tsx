import HeroSection from "./_components/HeroSection";
import css from "./home.module.scss";

export default async function Home() {
    return (
        <main className={css.main}>
            <HeroSection />
            <section className={css.placeholder}></section>
            <section className={css.placeholder}></section>
        </main>
    );
}
