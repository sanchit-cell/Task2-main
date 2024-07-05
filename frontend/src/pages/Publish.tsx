
import axios from "axios";
import { useState } from "react";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";


const Publish=()=>{
    const [post,setPost]=useState<any>({
        title:"",
        content:"",
        link:"",
        authorId:Number(localStorage.getItem("id"))
    });
    const navigate=useNavigate();
    async function handleClick() {
        
        try{
            const res=await axios({
                url:`${BackendUrl}/post/add`,
                method:"POST",
                data:post,
                headers:{
                    "Authorization":localStorage.getItem("id")
                }
            })
            console.log(res.data);
            
            navigate(`/post/${res.data.id}`)
        }catch(e){
            alert("Failed to post the Blog!")
        }
    }
    return(
        <div>
            <div className="flex my-8 mx-5 md:mx-[10%] flex-col md:justify-between md:flex-row">
               Post
                <div className="flex space-x-4 mt-5 md:mt-0">
                    <button onClick={handleClick} className="bg-green-600 rounded-3xl px-5 text-xl h-12 mt-2 text-white font-semibold">Publish</button>
                    
                   
                    <p className=" rounded-full bg-slate-400 p-3 text-2xl h-14 w-14 flex justify-center items-center font-bold">{(localStorage.getItem("name")+"")[0].toUpperCase()}</p>
                </div>
            </div>
            <div className="mt-[6%] mx-5 md:mx-[20%]">
                <div className=" space-y-5">
                    <div className="flex flex-col space-y-3 w-[100%]">
                        <textarea onChange={(e)=>{setPost({...post,title:e.target.value})}}  className=" text-slate-500 text-3xl md:text-5xl w-[100%]" placeholder="Title"></textarea >
                        <textarea onChange={(e)=>{setPost({...post,content:e.target.value})}} rows={8}  className=" text-slate-500 text-xl md:text-3xl w-[100%]" placeholder="Your Story..."></textarea >
                    </div>
                    <input onChange={(e)=>{setPost({...post,link:e.target.value})}} placeholder="Enter the Image Link!..." className="px-5 py-2 w-[100%]"></input>
                </div>
            </div>
        </div>
    )
}
export default Publish;