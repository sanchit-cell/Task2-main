
import { useNavigate } from "react-router-dom";

import { useState } from "react";
const NavBar=({to}:{to:string})=>{
    const navigate=useNavigate();
    const [logout,setLogout]=useState(false);
    return(
        <div className="flex flex-col md:flex-row space-y-5 justify-between pt-10 relative">
            <h1 onClick={()=>{navigate(to)}} className="font-bold text-3xl mt-6 ml-4">Posts</h1>
            <div className="flex space-x-12">
                <button onClick={()=>{navigate("/publish")}} type="button" className=" p-2 text-white bg-black  font-semibold rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Add Posts</button>
                
                <div onClick={()=>{
                    setLogout(c=>!c);
                }}  className="rounded-full w-12 h-12 border-2 border-slate-900  flex justify-center items-center">
                    <span className="text-2xl font-normal text-black font-serif font-lobster " >{(localStorage.getItem("name")+"")[0].toUpperCase()}</span>
                </div>
                <h1 onClick={()=>{
                    localStorage.removeItem("id");
                    localStorage.removeItem("name");
                    navigate("/");
                }} className={`absolute top-[105%] left-[85%] font-semibold text-xl bg-black text-white rounded-md py-3 px-4 ${logout?' dislay-block':' hidden'}`}>Logout </h1>
            </div>

        </div>
    )
}
export default NavBar;