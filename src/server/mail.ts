import { Resend } from "resend";
import { env } from "~/env.mjs";
import { verifyRoute } from "~/routes";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000${verifyRoute}?token=${token}`;

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
    const confirmLink = `http://localhost:3000${verifyRoute}?token=${token}`;

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
