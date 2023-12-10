import css from "./EndSection.module.scss";
import sharedCss from "../shared.module.scss";
import SVGComponent from "../../svg/SVG";

export default function EndSection() {
    return (
        <section className={css.end}>
            <div className={css.cta}>
                <h1 className={sharedCss.headerDecorated}>Take Back</h1>
                <button>Get Started</button>
                <h1>Your Control</h1>
            </div>
            <div className={css.foot}>
                <p>
                    <a href="\">Terms of Service</a> and <a href="\">Privacy Policy</a>
                </p>
                <p>{"hello@scripr.com"}</p>
                <ul>
                    <li>
                        <SVGComponent.GitHubLogo />
                    </li>
                    <li>
                        <SVGComponent.XLogo />
                    </li>
                </ul>
            </div>
        </section>
    );
}
