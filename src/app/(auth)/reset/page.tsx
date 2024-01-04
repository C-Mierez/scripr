import AuthFormWrapper from "../_components/AuthFormWrapper";
import AuthHero from "../_components/AuthHero";
import AuthScaffold from "../_components/AuthScaffold";
import css from "./Reset.module.scss";
import ResetForm from "./_components/ResetForm";

export default function ResetPage() {
    return (
        <AuthScaffold>
            <AuthHero
                label="Log In"
                header="Welcome Back!"
                subheader="Sign into your account to access your portfolios and continue managing your finances."
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
            <ResetForm />
            <div className={css.foot}>
                <div className={css.separator} />
                <p>
                    Remembered your password? <a href="/logIn">Log in</a>
                </p>
            </div>
        </div>
    );
}
