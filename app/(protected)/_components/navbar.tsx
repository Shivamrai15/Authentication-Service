"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {

    const pathname= usePathname()

    return (
        <header>
            <nav className="bg-[#E4D4C8] flex justify-between items-center p-4 w-full shadow-sm absolute top-0 left-0">
                <div className="flex gap-x-2">
                    <Button
                        variant={ pathname === "/server" ? "default" : "outline"}
                        asChild
                        size="sm"
                    >
                        <Link
                            href="/server"
                        >
                            Server
                        </Link>
                    </Button>
                    <Button
                        variant={ pathname === "/client" ? "default" : "outline"}
                        asChild
                        size="sm"
                    >
                        <Link
                            href="/client"
                        >
                            Client
                        </Link>
                    </Button>
                    <Button
                        variant={ pathname === "/admin" ? "default" : "outline"}
                        asChild
                        size="sm"
                    >
                        <Link
                            href="/admin"
                        >
                            Admin
                        </Link>
                    </Button>
                    <Button
                        variant={ pathname === "/settings" ? "default" : "outline"}
                        asChild
                        size="sm"
                    >
                        <Link
                            href="/settings"
                        >
                            Settings
                        </Link>
                    </Button>
                </div>
                <UserButton/>
            </nav>
        </header>
    )
}
