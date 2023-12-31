import AuthScaffold from "../_components/AuthScaffold";
import AuthHero from "../_components/AuthHero";
import AuthFormWrapper from "../_components/AuthFormWrapper";
import LogInForm from "./_components/LogInForm";
import { Button } from "@/components/ui/button";
import css from "./LogIn.module.scss";

export default function LogInPage() {
    return (
        <AuthScaffold>
            <AuthHero
                label="Log In"
                header="Welcome Back"
                subheader="Sign into your account to access your portfolios and continue managing your finances."
            />
            <AuthFormWrapper>
                <Login />
            </AuthFormWrapper>
        </AuthScaffold>
    );
}

function Login() {
    return (
        <div className={css.container}>
            <h2>Your Account</h2>
            <LogInForm />
            <div className={css.foot}>
                <p>Or sign in with</p>
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
                    Don't have an account? <a>Sign up</a>
                </p>
            </div>
        </div>
    );
}
