import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorEmail = async(
    email : string,
    token : string
) => {
    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Two Factor Authentication Code",
        html : `
        <p>Here is your Two Factor Authentication Code</p>
        <pre>
            <span style="font-size:20px;">
                ${token}
            </span>
          </pre>
        `
    })
}

export const sendVerificationEmail = async (
    email : string,
    token : string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Confirm your email",
        html : `
        <p>Click here to confirm email</p>
        <a href="${confirmLink}">${confirmLink}</a>
        `
    });
}

export const sendPaaswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    await resend.emails.send({
        from : "onboarding@resend.dev",
        to : email,
        subject : "Reset your Password",
        html : `
        <p>Click here to reset password</p>
        <a href="${resetLink}">${resetLink}</a>
        `
    });
}