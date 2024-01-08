"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";

import { SettingsSchema } from "@/schemas";

import {
    Switch
} from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Input
} from "@/components/ui/input";

import { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";

const SettingsPage = () => {

    const user = useCurrentUser();

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver : zodResolver(SettingsSchema),
        defaultValues : {
            name : user?.name || undefined,
            password : undefined,
            newPassword : undefined,
            role : user?.role,
            isTwoFactorEnabled : user?.isTwoFactorEnabled || undefined
        }
    });

    const onSubmit = (values : z.infer<typeof SettingsSchema>)=>{
        setError("");
        setSuccess("");
        startTransition(()=>{
            settings(
                values
            ).then((data)=>{
                if (data.error){
                    setError(data.error)
                }
                if(data.success){
                    setSuccess(data.success);
                    update();
                }
            }).catch(()=>{
                setError("Something went wrong");
            });
        })
        
    }

    return ( 
        <Card className="min-w-80 md:min-w-[30rem] overflow-hidden">
            <CardHeader>
                <h2 className="text-xl font-semibold text-center">⚙️ Settings Page</h2>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Jira"
                                                disabled = {isPending}
                                                
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {
                                user?.isOAuth === false && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({field})=>(
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="******"
                                                            disabled = {isPending}
                                                            type="password"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="newPassword"
                                            render={({field})=>(
                                                <FormItem>
                                                    <FormLabel>
                                                        New Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="******"
                                                            disabled = {isPending}
                                                            type="password"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )
                            }
                            <FormField
                                control={form.control}
                                name="role"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled = {isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>
                                                    ADMIN
                                                </SelectItem>
                                                <SelectItem value={UserRole.USER}>
                                                    USER
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            {
                                user?.isOAuth === false && (
                                    <FormField
                                        control={form.control}
                                        name="isTwoFactorEnabled"
                                        render={({field})=>(
                                            <FormItem className="flex flex-row items-center justify-between border rounded-md p-3">
                                                <div className="space-y-0.5">
                                                    <FormLabel>
                                                        Two Factor Authentication
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Enable two factor authentication for more secure access
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        disabled = {isPending}
                                                        checked = {field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
 
export default SettingsPage;