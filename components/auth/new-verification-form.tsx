"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(()=>{
        if (success || error) return;
        if(!token){
            setError("Missing Token");
            return;
        };
        newVerification(token)
        .then((data)=>{
            setSuccess(data.success);
            setError(data.error);
        }).catch(()=>{
            setError("Something went wrong!");
        });
    }, [token, error, success]);

    useEffect(()=>{
        onSubmit();
    }, [onSubmit])

    return (
        <CardWrapper
            headerLabel="Confirming your email"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center w-full">
                { !success && !error &&
                    <HashLoader size={30}/>
                }
                <FormSuccess message={success}/>
                { !success && (
                    <FormError message={error}/>
                )}
            </div>
        </CardWrapper>
    );
}