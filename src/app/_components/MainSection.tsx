import css from "../home.module.scss";
import ComparisonSection from "./home/section/ComparisonSection";
import ContactSegwaySection from "./home/section/ContactSegwaySection";
import FAQSection from "./home/section/FAQSection";
import FeaturesSection from "./home/section/FeaturesSection";
import PricingSection from "./home/section/PricingSection";
import SegwaySection from "./home/section/SegwaySection";
import StatsSection from "./home/section/StatsSection";
import ContactSection from "./home/section/ContactSection";
import AboutSection from "./home/section/AboutSection";
import EndSection from "./home/section/EndSection";
import Footer from "./home/Footer";

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
