import React from "react";
interface SignButtonProps {
    text:string,
    onClick:()=>void
}
const SignButton: React.FC<SignButtonProps>=({text,onClick})=>{
    return(
        <button onClick={onClick} className="w-[100%] bg-black text-white font-semibold text-lg align-middle p-2 rounded-md mt-6 ">{text}</button>
    );
}
export default SignButton;