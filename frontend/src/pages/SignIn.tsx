import { useState } from "react";
import InputBox from "../components/InputBox";
import SignButton from "../components/sign/SignButton";
import SignHeading from "../components/sign/SignHeading";
import SignSubHeader from "../components/sign/SignSubHeader";


import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";

const SignIn=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    async function handleClick(){
        try{
            const data={
                username,
                password
            }
            console.log(data,`${BackendUrl}/auth/signin`);
            
            const res=await axios({
                url:`${BackendUrl}/auth/signin`,
                method:"POST",
                data
            })
            localStorage.setItem("id",res.data.id);
            localStorage.setItem("name",res.data.username);
            navigate("/posts");
        }catch(e){
            console.log(e);
            alert("Failed to SignIn try again");
            // navigate("/signup");
        }
        
    }
    return(
        
            <div className="flex justify-center items-center h-screen">
                <div className="md:w-[30%]">
                    <div 
                        className="flex justify-center items-center flex-col my-5"
                    >
                        <SignHeading 
                            text="Login to your Account"
                        ></SignHeading>
                        <SignSubHeader 
                            to="/signup" 
                            text="Don't have an account?"
                            value="Signup"
                        ></SignSubHeader>
                    </div>
                    <InputBox 
                        type="text" 
                        label="User Name" 
                        placeholder="John_Doe" 
                        autoFocus={true}
                        setFunction={setUsername}
                    ></InputBox>
                    <InputBox 
                        type="password" 
                        label="Password" 
                        placeholder="******" 
                        autoFocus={false}
                        setFunction={setPassword}
                    ></InputBox>
                    <SignButton onClick={handleClick} text="Sign In"></SignButton>
                    <div className=" text-center py-4 ">
                        <Link to="/resetPassword" className=" text-center underline text-gray-700 text-sm">Forgot Password? </Link>
                    </div>
                </div>
            </div>
            
    )
}
export default SignIn;