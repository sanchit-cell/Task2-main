const SignText=({para,author,postion}:{para:string,author:string,postion:string})=>{
    return(
        <div>
            <h1 className="text-2xl font-bold">{para}</h1>
            <p className="text-lg font-semibold mt-7">{author}</p>
            <p className="text-md text-slate-500 mt-1">{postion}</p>
        </div>
    )
}
export default SignText;