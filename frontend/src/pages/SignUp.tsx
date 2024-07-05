import { useState } from "react";
import InputBox from "../components/InputBox";
import SignButton from "../components/sign/SignButton";
import SignHeading from "../components/sign/SignHeading";
import SignSubHeader from "../components/sign/SignSubHeader";


import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";

const SignUp=()=>{

    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");

    const navivgate=useNavigate();

    async function handelClick(){
        try{
            const data={
                email,
                username:name,
                password
            }
            console.log(data,`${BackendUrl}/auth/signup`);
            
            const res=await axios({
                url:`${BackendUrl}/auth/signup`,
                method:"POST",
                data,
            })
            localStorage.setItem("id",res.data.id);
            localStorage.setItem("name",res.data.username);
            navivgate("/posts");
        }catch(e){
            console.log(e);
            alert("Failed to Sign Up try again!")
            navivgate("/signup")
        }
    }
    return(
        
        <div className="flex justify-center items-center h-screen">
            <div className="md:w-[30%]">
                <div 
                    className="flex justify-center items-center flex-col my-5"
                >
                    <SignHeading 
                        text="Create an Account"
                    ></SignHeading>
                    <SignSubHeader 
                        to="/signin" 
                        text="Already have an account?"
                        value="Login"
                    ></SignSubHeader>
                </div>
                <InputBox 
                    type="text" 
                    label="Email" 
                    placeholder="xyz@gmail.com" 
                    autoFocus={true}
                    setFunction={setEmail}
                ></InputBox>
                <InputBox 
                    type="text" 
                    label="UserName" 
                    placeholder="John Doe" 
                    autoFocus={false}
                    setFunction={setName}
                ></InputBox>
                <InputBox 
                    type="password" 
                    label="Password" 
                    placeholder="******" 
                    autoFocus={false}
                    setFunction={setPassword}
                ></InputBox>
                <SignButton onClick={handelClick} text="Sign Up"></SignButton>
            </div>
        </div>
        
    )
}
export default SignUp;