"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import * as z from "zod";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPaaswordResetEmail } from "@/lib/mail";

export const reset = async( values : z.infer<typeof ResetSchema> )=>{
    const validateSchema = ResetSchema.safeParse(values);
    if(!validateSchema.success){
        return { error: "Invalid email" };
    }
    const { email } = validateSchema.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email not found" }
    }

    const passwordToken = await generatePasswordResetToken(email);
    await sendPaaswordResetEmail(passwordToken.email, passwordToken.token);
    return { success: "Email has been sent" };

}