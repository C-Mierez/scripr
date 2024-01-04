import AuthFormWrapper from "../_components/AuthFormWrapper";
import AuthHero from "../_components/AuthHero";
import AuthScaffold from "../_components/AuthScaffold";
import VerifyForm from "./_components/VerifyForm";

export default function VerifyPage() {
    return (
        <AuthScaffold>
            <AuthHero
                label=""
                header="Almost there!"
                subheader="Just one last step before you can join our community."
            />
            <AuthFormWrapper>
                <VerifyForm />
            </AuthFormWrapper>
        </AuthScaffold>
    );
}
