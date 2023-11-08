import css from "./test.module.scss";

export default function Test() {
    return (
        <main className={css.main}>
            <div className={css.stickyWrapperHero}>
                <section className={css.hero}>
                    <h1>Hero</h1>
                </section>
                <div className={css.stickySpacer}></div>
            </div>

            <div className={css.stickyWrapperGlobal}>
                <section className={css.segway}>
                    <h1>Segway</h1>
                </section>
                <h1 className={css.features}>Features</h1>
                <section className={css.features}></section>
                <h1 className={css.about}>About</h1>
                <section className={css.about}></section>
            </div>
        </main>
    );
}
