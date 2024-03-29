import Link from "next/link";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import AuthHero from "../_components/AuthHero";
import AuthScaffold from "../_components/AuthScaffold";
import BackToLandingButton from "../_components/BackToLandingButton";
import OAuthProvider from "../logIn/_components/OAuthProviders";
import SignUpForm from "./_components/SignUpForm";
import css from "./SignUp.module.scss";

export default function SignUpPage() {
    return (
        <AuthScaffold>
            <AuthHero
                label="Sign Up"
                header="Begin your Journey!"
                subheader="Create an account and join our community of people taking back control of their finances."
            />
            <AuthFormWrapper>
                <SignUp />
            </AuthFormWrapper>
        </AuthScaffold>
    );
}

function SignUp() {
    return (
        <div className={css.container}>
            <div className={css.header}>
                <h2>New Account</h2>
                <BackToLandingButton />
            </div>
            <SignUpForm />
            <div className={css.foot}>
                <p>Or sign up with</p>
                <OAuthProvider />
                <div className={css.separator} />
                <p>
                    Already have an account? <Link href="/logIn">Log In</Link>
                </p>
            </div>
        </div>
    );
}
