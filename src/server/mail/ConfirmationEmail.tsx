import { Body, Head, Html, Preview, Text, Container, Heading, Section, Hr, Img } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

/* ---------------------------------- Email --------------------------------- */
export interface ConfirmationEmailProps {
    token: string;
}

export default function ConfirmationEmail(props: ConfirmationEmailProps) {
    return (
        <Html>
            <Head>
                <title>Confirmation Token</title>
            </Head>
            <Preview>Your confirmation token.</Preview>
            <Tailwind>
                <Body className="text-[#08090c]">
                    <Container className="px-10 py-6 bg-[#f3f5f7]">
                        <Section>
                            <Heading className="text-sm text-[#48ad8b]">Confirmation Token</Heading>
                            <Text className="text-2xl text-center text-[#08090c]">
                                Enter the following code to confirm your action.
                            </Text>
                            <Container className="py-2 px-4 bg-[#ccd0d6] ">
                                <Text className="text-6xl font-bold mx-auto text-center text-[#08090c]">
                                    {props.token}
                                </Text>
                            </Container>
                        </Section>
                        <Section>
                            <Text className="text-[#ccd0d6] text-sm">
                                If you did not request this code, just ignore this email.
                            </Text>
                            <Hr />
                            {/* <Text className="text-[#ccd0d6] text-sm my-1 mx-auto text-center">Scripr</Text> */}
                            <Img
                                src="https://scripr.xyz/assets/logoFullBlack.png"
                                alt="Scripr"
                                width={88}
                                height={65}
                                className="mx-auto mt-4"
                            ></Img>
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
