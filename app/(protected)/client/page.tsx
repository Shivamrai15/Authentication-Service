"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/app/(protected)/_components/user-info";


const ServerPage = () => {

    const user = useCurrentUser()

    return (
        <UserInfo
            user={user}
            label="Client Page"
        />
    )
}

export default ServerPage