import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children : React.ReactNode
}

const ProtectedLayout = ({
    children
} : ProtectedLayoutProps) => {
    return (
        <div className="min-h-full w-full flex flex-col bg-[#533440] relative">
            <Navbar/>
            <div className="flex justify-center items-center h-full">
                {children}

            </div>
        </div>
    )
}

export default ProtectedLayout;