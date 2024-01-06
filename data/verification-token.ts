import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async( email : string ) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where : {
                email
            }
        });
        return verificationToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getVerificationTokenByToken = async( token : string ) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where : {
                token
            }
        });
        return verificationToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}