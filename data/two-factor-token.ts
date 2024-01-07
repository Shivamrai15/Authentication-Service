import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async( token: string )=>{
    try {
        const existingToken = await db.twoFactorToken.findUnique({
            where : {
                token
            }
        });
        return existingToken;
    } catch (error) {
        return null;
    }
}

export const getTwoFactorTokenByEmail = async( email: string )=>{
    try {
        const existingToken = await db.twoFactorToken.findFirst({
            where : {
                email
            }
        });
        return existingToken;
    } catch (error) {
        return null;
    }
}