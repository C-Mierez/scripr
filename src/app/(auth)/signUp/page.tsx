import AuthScaffold from "../_components/AuthScaffold";
import AuthHero from "../_components/AuthHero";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import { Button } from "@/components/ui/button";
import css from "./SignUp.module.scss";
import SignUpForm from "../logIn/_components/SignUpForm";

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
            <h2>New Account</h2>
            <SignUpForm />
            <div className={css.foot}>
                <p>Or sign up with</p>
                <ul className={css.oauth}>
                    <li>
                        <Button variant="outline" className="w-full">
                            Google
                        </Button>
                    </li>
                    <li>
                        <Button variant="outline" className="w-full">
                            GitHub
                        </Button>
                    </li>
                </ul>
                <div className={css.separator} />
                <p>
                    Already have an account? <a href="/logIn">Log In</a>
                </p>
            </div>
        </div>
    );
}
