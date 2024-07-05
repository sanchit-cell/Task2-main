import React, { useState } from "react";

interface InputBoxInterface {
    placeholder: string,
    label: string, 
    type: string, 
    autoFocus?: boolean, 
    setFunction: (value: string) => void;
}

const InputBox:React.FC<InputBoxInterface> = ({ placeholder, label, type, autoFocus,setFunction }) => {
    const [value,setValue]=useState("");
    function handelClick(){
        setFunction(value);   
    }
    return(
        <>
            <p className=" text-lg font-bold my-3">{label}</p>
            <input onBlur={handelClick} onChange={(e)=>{setValue(e.target.value)}}  autoFocus={autoFocus} type={type} className=" w-[100%] p-5 rounded-md border-2 " placeholder={placeholder}></input>
        </>
    )
}
export default InputBox;