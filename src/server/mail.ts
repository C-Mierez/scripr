import { Resend } from "resend";
import { env } from "~/env.mjs";
import { passwordResetVerifyRoute, verifyRoute } from "~/routes";

const resend = new Resend(env.RESEND_API_KEY);

const appUrl = env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${appUrl}${verifyRoute}?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email to access Scripr",
        html: `
            <p>
                Click <a href="${confirmLink}" target="_blank">here</a> to verify your email.
            </p>
        `,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const confirmLink = `${appUrl}${passwordResetVerifyRoute}?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your Scripr password",
        html: `
            <p>
                Click <a href="${confirmLink}" target="_blank">here</a> to reset your password.
            </p>
        `,
    });
};

export const sendTwoFactorConfirmationEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your two-factor confirmation code",
        html: `
            <p>
                Your two-factor confirmation code is <b>${token}</b>.
            </p>
        `,
    });
};
