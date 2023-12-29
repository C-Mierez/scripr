import css from "./EndSection.module.scss";
import sharedCss from "../shared.module.scss";
import SVGComponent from "../../svg/SVG";
import { ContactEmail } from "../../../../utils/data";
import ClickableClipboardSmallText from "../../ClickableClipboardSmallText";

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
                <ClickableClipboardSmallText />
                <ul>
                    <li>
                        <a href="https://github.com/C-Mierez/scripr" target="_blank">
                            <SVGComponent.GitHubLogo />
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/CMierez_" target="_blank">
                            <SVGComponent.XLogo />
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
