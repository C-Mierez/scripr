import AuthFormWrapper from "../../_components/AuthFormWrapper";
import AuthHero from "../../_components/AuthHero";
import AuthScaffold from "../../_components/AuthScaffold";
import PasswordResetForm from "./_components/PasswordResetForm";
import css from "./PasswordResetVerification.module.scss";

export default function PasswordResetVerificationPage() {
    return (
        <AuthScaffold>
            <AuthHero
                label=""
                header="Almost there!"
                subheader="Just one last step before you can have your new password."
            />
            <AuthFormWrapper>
                <Reset />
            </AuthFormWrapper>
        </AuthScaffold>
    );
}

function Reset() {
    return (
        <div className={css.container}>
            <h2>Password Reset</h2>
            <PasswordResetForm />
            <div className={css.foot}>
                <div className={css.separator} />
                <p>
                    Remembered your password? <a href="/logIn">Log in</a>
                </p>
            </div>
        </div>
    );
}
