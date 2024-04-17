import css from "./EndSection.module.scss";
import sharedCss from "../shared.module.scss";
import SVGComponent from "../../svg/SVG";
import { ContactEmail } from "../../../../lib/data";
import ClickableClipboardSmallText from "../../ClickableClipboardSmallText";

export default function EndSection() {
    return (
        <section className={css.end}>
            <div className={css.cta}>
                <h1 className={sharedCss.headerDecorated}>Take Back</h1>
                <a href="/dashboard">
                    <button>Get Started</button>
                </a>
                <h1>Your Control</h1>
            </div>
            <div className={css.foot}>
                <p>
                    <a href="\">
                        <span>Terms of Service</span>
                    </a>{" "}
                    and{" "}
                    <a href="\">
                        <span>Privacy Policy</span>
                    </a>
                </p>
                <span>
                    <ClickableClipboardSmallText />
                </span>
                <ul>
                    <li>
                        <a href="https://github.com/C-Mierez/scripr" target="_blank">
                            <span>
                                <SVGComponent.GitHubLogo />
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/CMierez_" target="_blank">
                            <span>
                                <SVGComponent.XLogo />
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
