import { useState } from "react";
import InputBox from "../components/InputBox";
import SignButton from "../components/sign/SignButton";
import SignHeading from "../components/sign/SignHeading";
import { useNavigate } from "react-router-dom";


const ResetPassword=()=>{

    const [email,setEmail]=useState("");
  
    const navivgate=useNavigate();

    function handelClick(){
        //here send the email to user
        console.log(email);
        localStorage.setItem("email",email);
        navivgate("/newPassword");
    }

   
    return(
        
        <div className="flex justify-center items-center h-screen">
            <div className="md:w-[30%]">
                <div 
                    className="flex justify-center items-center flex-col my-5"
                >
                    <SignHeading 
                        text="Reset Password"
                    ></SignHeading>
                  
                </div>
                <InputBox 
                    type="text" 
                    label="Email" 
                    placeholder="xyz@gmail.com" 
                    autoFocus={true}
                    setFunction={setEmail}
                ></InputBox>
                
                <SignButton onClick={handelClick} text="Send Mail"></SignButton>
            </div>
        </div>
        
    )
}
export default ResetPassword;