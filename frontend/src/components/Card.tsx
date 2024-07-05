
import { useNavigate } from "react-router-dom";

interface CardInterface {
    title:string,
    content:string,
    name:string,
    id:number,
    createdAt:Date,
    link:string
}
const Card=({title,content,name,id,createdAt,link}:CardInterface)=>{
    const navigate =useNavigate();
    console.log(id);
    
    function handleClick(){
        try{
            navigate(`/post/${id}`);
        }catch(E){
            console.log(E);
        }
    }
    return(
        <div onClick={handleClick} className="flex items-center space-x-5">
            <div className="md:w-[75%] space-y-3">
                <div className="flex space-x-4">
                    <div className=" bg-slate-500 rounded-full w-10 h-10 flex justify-center items-center">
                        <span className=" text-md font-semibold text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <p className="text-lg text-slate-700 mt-2">{name}</p>
                    <p className="text-slate-500 mt-3">{(createdAt+"").slice(0,10)}</p>
                </div>
                <div>
                    
                    <h1 className="text-3xl font-bold leading-relaxed">{title}</h1>
                    <p className="text-lg text-slate-800 leading-relaxed ">{content.slice(0,200)+" . . ."}</p>
                </div>
                <div className=" text-slate-400">
                    {
                        Math.ceil(content.length/100) + " mins read"
                    }
                </div>
            </div>
            <div className="hidden md:block">
                <img className=" w-44 h-44 rounded-md" src={link}></img>
            </div>
        </div>
    )
}
export default Card;