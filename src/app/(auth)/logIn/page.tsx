import AuthFormWrapper from "../_components/AuthFormWrapper";
import AuthHero from "../_components/AuthHero";
import AuthScaffold from "../_components/AuthScaffold";
import LogInForm from "./_components/LogInForm";
import OAuthProvider from "./_components/OAuthProviders";
import css from "./LogIn.module.scss";
import BackToLandingButton from "../_components/BackToLandingButton";

export default function LogInPage() {
    return (
        <AuthScaffold>
            <AuthHero
                label="Log In"
                header="Welcome Back!"
                subheader="Sign into your account to access your portfolios and continue managing your finances."
            />
            <AuthFormWrapper>
                <LogIn />
            </AuthFormWrapper>
        </AuthScaffold>
    );
}

function LogIn() {
    return (
        <div className={css.container}>
            <div className={css.header}>
                <h2>Your Account</h2>
                <BackToLandingButton />
            </div>
            <LogInForm />
            <div className={css.foot}>
                <p>Or sign in with</p>
                <OAuthProvider />
                <div className={css.separator} />
                <p>
                    Don't have an account? <a href="/signUp">Sign up</a>
                </p>
            </div>
        </div>
    );
}
