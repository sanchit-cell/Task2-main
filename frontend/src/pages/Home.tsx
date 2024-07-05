import { Link } from "react-router-dom"

const Home=()=>{
    return(
        <div className=" flex justify-center items-center h-screen">
            <Link className="p-2 rounded-md bg-gray-900 text-white text-lg m-5" to="/signup">Sign Up</Link>
            <Link className="p-2 rounded-md bg-gray-900 text-white text-lg m-5" to="/signin">Sign In</Link>
            <Link className="p-2 rounded-md bg-gray-900 text-white text-lg m-5" to="/posts">Posts</Link>
        </div>
    )
}
export default Home;