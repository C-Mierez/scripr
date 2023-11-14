import { CSSVariables } from "~/utils/utils";
import css from "./contactForm.module.scss";

export default function ContactForm() {
    return (
        <form className={css.contactForm}>
            <div className={css.fields}>
                <TextField label={"Subject"} />
                <TextField label={"First Name"} />
                <TextField label={"Last Name"} />
                <TextField label={"E-mail"} />
                <TextField label={"Phone"} />
                <TextArea label={"Your Message"} />
                <button className={css.submit}>Submit</button>
            </div>
        </form>
    );
}

export function TextField(props: { label: string }) {
    return (
        <div className={css.textfield}>
            <input type="text" required />
            <div className={css.label}>{props.label}</div>
        </div>
    );
}

export function TextArea(props: { label: string }) {
    return (
        <div className={CSSVariables(css.textfield, css.textarea)}>
            <textarea required />
            <div className={css.label}>{props.label}</div>
        </div>
    );
}
