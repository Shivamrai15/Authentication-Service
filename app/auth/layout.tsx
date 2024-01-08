const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full flex items-center justify-center bg-[#533440]">
      {children}
    </div>
   );
}
 
export default AuthLayout;