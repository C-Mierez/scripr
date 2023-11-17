import HeroSection from "./_components/HeroSection";
import MainSection from "./_components/MainSection";
import css from "./home.module.scss";

/* ////////////////////////////////////////////////////////////////////////// */
/*                                Landing Page                                */
/* ////////////////////////////////////////////////////////////////////////// */

export default async function Home() {
    return (
        <main className={css.main}>
            <HeroSection />
            <MainSection />
        </main>
    );
}
