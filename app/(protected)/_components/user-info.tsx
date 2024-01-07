import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth"

interface UserInfoProps {
    user? :  ExtendedUser;
    label: String;
}

export const UserInfo = ({user, label} : UserInfoProps)=>{
    return (
        <Card className="min-w-80 md:min-w-[30rem] overflow-hidden">
            <CardHeader>
                <h2 className="text-xl font-semibold text-center">
                    {label}
                </h2>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex flex-row items-center justify-between rounded-lg bg-slate-50 p-1 px-2">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <pre className="truncate">
                        {user?.id}
                    </pre>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg bg-slate-50 p-1 px-2">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <pre className="truncate">
                        {user?.name}
                    </pre>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg bg-slate-50 p-1 px-2">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <pre className="truncate">
                        {user?.email}
                    </pre>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg bg-slate-50 p-1 px-2">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <pre className="truncate">
                        {user?.role}
                    </pre>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg bg-slate-50 p-1 px-2">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <pre className="truncate">
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </pre>
                </div>
            </CardContent>
        </Card>
    ) 
}