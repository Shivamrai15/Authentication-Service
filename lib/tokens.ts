import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generateVerificationToken = async(email : string) => {
    const token = uuidv4();
    const expire = new Date(new Date().getTime() + 3600*1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data :{
            email,
            token,
            expire
        }
    });

    return verificationToken;
}