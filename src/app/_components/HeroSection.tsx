"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ButtonCTA from "./ButtonCTA";
import css from "../home.module.scss";
import { useEffect, useRef } from "react";
import MainSection from "./MainSection";

export default function HeroSection() {
    // Locomotive Scroll Initialization
    useEffect(() => {
        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;
            new LocomotiveScroll({
                lenisOptions: {
                    lerp: 0.08,
                    touchMultiplier: 0.05,
                    smoothTouch: false,
                },
            });
        })().catch((e) => {
            console.log(e);
        });
    }, []);

    const heroSectionRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroSectionRef });

    /* ------------------------------ Section Anim ------------------------------ */
    const padding = useTransform(scrollYProgress, [0, 0.1], ["1.5lvh", "0lvh"]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.1], ["6lvh", "0lvh"]);

    /* -------------------------------- Grid Anim ------------------------------- */
    const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100%", "120%"]);

    /* ------------------------------- Slogan Anim ------------------------------ */
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0.4, 1], ["0%", "20%"]);

    return (
        <div ref={heroSectionRef} className={css.heroWrapper}>
            <motion.section className={css.hero} style={{ paddingInline: padding, paddingTop: padding }}>
                <div className={css.background} />
                <motion.div className={css.cardArea} style={{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}>
                    <div className={css.backgroundGrid}>
                        <motion.div className={css.grid} style={{ backgroundSize }} />
                    </div>
                    <div className={css.branding}>
                        <div className={css.logo}>
                            <svg width="158" height="210" viewBox="0 0 158 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_535_203)">
                                    <g opacity="0.0169903">
                                        <path d="M56.3484 185.558C44.8893 189.519 36.1477 187.136 36.3709 187.044C46.412 196.102 58.1172 201.436 72.2778 203.75C71.1748 203.122 63.0802 198.898 56.3484 185.558Z" />
                                    </g>
                                    <path d="M84.4453 0C70.3528 0.280122 62.7537 4.12161 56.4355 9.86523C43.0405 24.5183 32.3733 57.1628 78.1465 78.0703C84.0781 80.4912 89.7835 82.1433 95.5703 83.8477C132.138 94.824 146.322 108.778 153.229 136.195C142.097 102.928 111.58 93.0287 88.2988 86.6523C73.0449 82.4744 62.3722 77.603 54.7285 70.4961C44.512 60.9972 29.2013 41.847 50.6875 9.96289C28.7464 23.8047 17.4098 51.7478 38.1387 78.3828C32.152 76.827 26.7507 73.2424 21.8223 68.3379C26.2921 85.7604 43.2855 98.5704 58.2109 99.7832C83.1708 101.975 85.4585 102.676 100.537 105.59C90.8772 105.98 81.5269 109.956 75.2793 113.779C113.956 107.867 131.148 123.442 148.395 138.959C144.861 139.136 141.844 139.038 135.441 140.732C148.684 145.429 148.208 152.364 149.061 159.795C147.908 159.106 146.756 158.645 145.604 158.393C146.676 162.9 146.865 167.404 143.836 173.039C143.275 170.74 143.079 169.398 142.773 167.584C142.501 170.234 142.21 173.781 141.234 176.23C139.827 177.8 137.621 178.493 135.498 179.275C137.051 179.243 138.649 179.397 140.35 179.959C138.117 183.841 134.97 187.09 131.793 190.318L128.162 188.486C127.915 191.355 127.243 193.877 126.264 196.537C127.289 195.656 128.274 194.719 129.057 193.504C128.938 193.403 128.842 193.278 128.776 193.137C128.71 192.996 128.676 192.843 128.676 192.687C128.676 192.546 128.704 192.406 128.759 192.275C128.813 192.144 128.893 192.025 128.994 191.925C129.095 191.825 129.215 191.745 129.347 191.691C129.479 191.637 129.621 191.609 129.764 191.609C129.907 191.609 130.048 191.637 130.18 191.691C130.312 191.745 130.432 191.825 130.533 191.925C130.634 192.025 130.714 192.144 130.769 192.275C130.824 192.406 130.852 192.546 130.852 192.687C130.852 192.829 130.824 192.969 130.769 193.1C130.714 193.231 130.634 193.35 130.533 193.45C130.432 193.55 130.312 193.63 130.18 193.684C130.048 193.738 129.907 193.766 129.764 193.766C129.74 193.765 129.717 193.764 129.693 193.762C128.321 196.141 126.547 198.234 124.793 200.34C149.244 179.883 157.603 159.346 157.623 141.26C157.623 106.85 138.768 87.3781 109.41 76.3398C106.091 75.3458 102.981 74.3209 100.074 73.2676C95.887 71.206 91.909 59.7902 91.0996 56.5703C89.3548 64.2777 92.6857 70.7071 89.9961 69.1641C65.8277 58.0998 61.0581 45.4964 60.3945 37.3105C59.4206 15.9668 75.0061 10.2644 84.6855 9.85156C92.1153 9.68829 99.3048 12.8678 106.01 17.7051C107.709 18.9504 110.263 22.0206 111.006 26.6816C111.915 23.4112 112.036 22.5571 113.268 23.6953C117.206 27.3355 120.918 31.3773 124.352 35.4082C128.29 40.0677 134.933 47.1702 140.41 47.9668C143.464 48.315 145.214 47.1593 146.111 46.4043C147.537 45.3035 148.896 43.3754 150.189 39.7676C146.069 44.9334 143.375 45.7519 139.443 43.4941C135.025 40.3791 132.264 35.2017 129.646 31.1484C118.873 14.5101 105.777 1.23998 84.4453 0Z" />
                                    <path d="M6.10352e-05 153.732C17.5487 151.664 24.3977 151.59 32.0874 155.179C15.1456 157.977 4.75302 163.524 3.06956 167.891C10.8316 171.07 22.8386 172.459 35.6888 170.868C34.3154 173.034 28.2962 177.165 24.3688 188.287C30.2679 188.707 37.0192 187.751 45.1641 185.134C45.1573 190.942 45.0537 197.176 52.1697 203.658C57.2885 201.817 59.9771 199.722 63.7827 195.828C67.184 201.756 76.1513 207.977 90.5086 208.91C99.7982 209.513 110.147 207.375 121.204 203.479C109.068 206.833 71.1734 214.371 64.7125 186.067C63.787 190.203 56.9577 196.652 52.8898 196.775C47.6456 190.063 50.1552 183.56 52.2559 177.062C47.3248 179.051 37.2109 183.582 29.6484 183.706C34.024 173.816 41.359 168.658 41.359 168.658C41.1581 168.837 20.3522 169.548 12.4424 166.643C20.5919 160.707 33.67 159.044 44.7683 155.918C41.5969 153.643 33.071 149.187 16.0067 150.805C8.03901 151.792 7.07643 152.042 6.10352e-05 153.732Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_535_203">
                                        <rect width="157.623" height="209.011" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p className={css.name}>SCRIPR</p>
                    </div>
                    <motion.div className={css.slogan} style={{ opacity, translateY }}>
                        <motion.h1 style={{ scale }}>All your Finances</motion.h1>
                        <motion.h2 style={{ scale }}>in one single place</motion.h2>
                    </motion.div>
                    <CTA></CTA>
                </motion.div>
            </motion.section>
            <div className={css.heroSpacer} />
            <MainSection padding={padding} />
        </div>
    );
}

function CTA() {
    return (
        <div className={css.cta}>
            <ButtonCTA />
            <div className={css.description}>
                <p>Billed annually. Only 5$ a month.</p>
                <p>Join us now. Cancel any time.</p>
            </div>
        </div>
    );
}
