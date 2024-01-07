import { auth } from "@/auth";
import { UserInfo } from "@/app/(protected)/_components/user-info";


const ServerPage = async() => {

    const session = await auth();

    return (
        <UserInfo
            user={session?.user}
            label="Server Page"
        />
    )
}

export default ServerPage