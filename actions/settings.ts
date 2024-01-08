"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { SettingsSchema } from "@/schemas";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export const settings = async( values : z.infer<typeof SettingsSchema>) => {
    const session = await auth();
    if(!session?.user){
        return { error: "Unauthorized" }
    }

    const user = await getUserById(session.user.id);
    if(!user){
        return { error: "Unauthorized" }
    }

    if ( session.user.isOAuth ){
        values.password  =  undefined,
        values.newPassword = undefined,
        values.isTwoFactorEnabled = undefined
    }

    if ( values.password && values.newPassword && user.password){
        const passwordMatch =  await bcrypt.compare(values.password, user.password);
        if (!passwordMatch) {
            return { error: "Invalid Password" }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where : {
            id : user.id
        },
        data : {
            ...values
        }
    });
    return {
        success : "Settings Updated"
    }
}