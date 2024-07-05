import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { BackendUrl } from "../config";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";


interface PostsInterface {
    id:number,
    title:string,
    content:string,
    createdAt:Date,
    link:string,
    author:{
        username:string
    },
}

const Posts=()=>{
    const [posts,setPosts]=useState<PostsInterface[]>([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        async function callme() {
            try{
                const res=await axios({
                    url:`${BackendUrl}/post/posts`,
                    method:"GET",
                    headers:{
                        "Authorization":localStorage.getItem("id")
                    }
                })
                console.log(res);
                
                setPosts(res.data);
                setLoading(false);
            }catch(e:any){
               alert("Failed to get Posts try again!")
            }
        }
        callme()
    },[])

    return(
        <div>
            {
                loading?
                <div className="m-[10%]">
                    <Loader></Loader>
                </div>
                :
                <div className="m-[10%] mt-0 space-y-8 md:space-y-16">
                    <NavBar to="/"></NavBar>
                    <hr></hr>
                    {
                        posts.map((post)=><Card key={post.id} id={post.id} title={post.title} content={post.content} name={post.author.username} link={post.link}  createdAt={post.createdAt}></Card>)
                    }
                </div>
            }
        </div>
    )
}
export default Posts;