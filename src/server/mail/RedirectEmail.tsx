import { Body, Head, Html, Preview, Text, Container, Heading, Section, Hr, Img, Link } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

/* ---------------------------------- Email --------------------------------- */
export interface RedirectEmailProps {
    emailType: "verify" | "password-reset";
    redirectUrl: string;
}

export default function RedirectEmail(props: RedirectEmailProps) {
    const title = props.emailType === "verify" ? "Email Verification" : "Password Reset";
    const preview =
        props.emailType === "verify" ? "Verify your email to access Scripr." : "Reset your Scripr password.";
    return (
        <Html>
            <Head>
                <title>{title}</title>
            </Head>
            <Preview>{preview}</Preview>
            <Tailwind>
                <Body className="text-[#08090c]">
                    <Container className="px-10 py-6 bg-[#f3f5f7]">
                        <Section>
                            <Heading className="text-sm text-[#48ad8b]">{title}</Heading>
                            <Text className="text-2xl text-center text-[#08090c]">
                                Click the following button to{" "}
                                {props.emailType === "verify" ? "verify your email" : "reset your password"}.
                            </Text>
                            <Link href={props.redirectUrl} target="_blank">
                                <Container className="py-4 px-4 bg-[#48ad8b]">
                                    <Text className="text-xl m-0 font-bold mx-auto text-center text-[#f3f5f7]">
                                        {props.emailType === "verify" ? "Verify" : "Reset"}
                                    </Text>
                                </Container>
                            </Link>
                        </Section>
                        <Section>
                            <Text className="text-[#ccd0d6] text-sm">
                                If you did not make this request, just ignore this email.
                            </Text>
                            <Hr />
                            <Text className="text-[#ccd0d6] text-sm my-1 mx-auto text-center">Scripr</Text>
                            <Text className="text-[#ccd0d6] text-xs my-1 mx-auto text-center">
                                All your finances, in one single place™
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
