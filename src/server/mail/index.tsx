import { Resend } from "resend";
import { env } from "~/env.mjs";
import { passwordResetVerifyRoute, verifyRoute } from "~/routes";
import ConfirmationEmail from "./ConfirmationEmail";
import RedirectEmail from "./RedirectEmail";

const resend = new Resend(env.RESEND_API_KEY);

const appUrl = env.NEXT_PUBLIC_APP_URL;

const emailDomain = env.NEXT_PUBLIC_DOMAIN;

const emailSenderAccount = `account@${emailDomain}`;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${appUrl}${verifyRoute}?token=${token}`;

    await resend.emails.send({
        from: emailSenderAccount,
        to: email,
        subject: "Verify your email to access Scripr",
        react: <RedirectEmail emailType="verify" redirectUrl={confirmLink} />,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `${appUrl}${passwordResetVerifyRoute}?token=${token}`;

    await resend.emails.send({
        from: emailSenderAccount,
        to: email,
        subject: "Reset your Scripr password",
        react: <RedirectEmail emailType="password-reset" redirectUrl={confirmLink} />,
    });
};

export const sendTwoFactorConfirmationEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: emailSenderAccount,
        to: email,
        subject: "Your two-factor confirmation code",
        react: <ConfirmationEmail token={token} />,
    });
};

// export const testEmail = async () => {
//     const confirmLink = `${appUrl}${passwordResetVerifyRoute}?token=8431457856468484`;

//     await resend.emails.send({
//         from: emailSenderAccount,
//         to: "carlos.mierez20@gmail.com",
//         subject: "test",
//         react: <RedirectEmail emailType="password-reset" redirectUrl={confirmLink} />,
//     });
// };
