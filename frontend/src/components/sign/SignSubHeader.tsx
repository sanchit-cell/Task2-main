import { Link } from "react-router-dom";

const SignSubHeader=({text,to,value}:{text:string,to:string,value:string})=>{
    return(
        <div className="flex">
            <p className="text-md md:text-lg text-slate-500">{text}</p>
            <Link to={to} className="text-sm md:text-lg text-slate-500 underline ml-1">{value}</Link>
        </div>
    );
}
export default SignSubHeader;