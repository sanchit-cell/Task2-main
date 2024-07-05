import axios from "axios";
import PostDate from "../components/post/PostDate";
import PostHeading from "../components/post/PostHeading";

import { useEffect, useState } from "react";
import { BackendUrl } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Likes from "../components/Likes";

const Post = () => {
  const [object, setObject] = useState({
    author: {
      id: 0,
      username: "",
      email: "",
      password: ""
    },
    content: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    link: "",
    likes: [],
    comments: []
  });

  const [loader, setLoading] = useState(true);
  const [isLiked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function fetchPost() {
        const res = await axios({
          url: `${BackendUrl}/post/posts/${id}`,
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("id")
          }
        });

        setObject(res.data);

        let ans = false;
        res.data.likes.forEach((item:any) => {
          if (item.userId === Number(localStorage.getItem("id"))) {
            ans = true;
          }
        });

        setLiked(ans);
        setLoading(false);
      }
      fetchPost();
    } catch (e) {
      alert("Failed to get post try again!");
    }
  }, [id]);

  async function handleDelete(){
    try{
        const ans=prompt("Sure Want to delete?y/n");
        if(ans=="y")
        {
            await axios({
                url:`${BackendUrl}/post/posts/${id}`,
                method:"DELETE",
                headers:{
                    "Authorization":localStorage.getItem("id")
                }
            });
            navigate("/posts");
        }
    }catch(e){
        alert("Failed to delete post try again!");
    }
}

  async function handleCommentSubmit(e:any) {
    e.preventDefault();
    try {
      const res = await axios({
        url:`${BackendUrl}/post/posts/${id}/comments`,
        method:"POST",
        data:{
            content:commentText,
            userId:Number(localStorage.getItem("id"))
        },
        headers: {
            "Authorization": localStorage.getItem("id")
        }
        
    });
      setObject((prevState:any) => ({
        ...prevState,
        comments: [...prevState.comments, res.data]
      }));
      setCommentText("");
    } catch (error) {
      alert("Failed to add comment, please try again.");
    }
  }

  return (
    <>
      {loader ? (
        <div className="m-[7%]">
          <Loader></Loader>
        </div>
      ) : (
        <div className="m-[10%] mt-0 space-y-8 md:space-y-12">
          <NavBar to="/posts"></NavBar>
          <hr></hr>
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-4 space-y-5 md:m-[6%] mt-5">
              <PostHeading text={object.title}></PostHeading>
              <div className="lg:relative">
                <div>
                  <PostDate
                    text={"Created Date: " + object.createdAt.slice(0, 10)}
                  ></PostDate>
                  <PostDate
                    text={"Created Time: " + object.createdAt.slice(11, 19)}
                  ></PostDate>
                </div>
                <Likes
                  count={object.likes.length}
                  postId={Number(id)}
                  userId={Number(localStorage.getItem("id"))}
                  isDone={isLiked}
                />
              </div>

              <img
                src={object.link}
                alt="img"
                className="w-[100%] lg:h-[20%] mb-5 rounded-md"
              />
              <p className="text-xl leading-relaxed text-slate-700">
                {object.content}
              </p>
              {object.author.id === Number(localStorage.getItem("id")) ? (
                <div className=" space-y-4">
                    <hr/>
                    <div className=" space-x-5">
                    
                    <button
                        onClick={() => handleDelete()}
                        className="font-semibold px-4 py-2 bg-black rounded-lg text-lg active:bg-gray-900  text-red-600"
                    >
                        Delete
                    </button>
                    <button className="font-semibold px-4 py-2 bg-black rounded-lg text-lg active:bg-gray-900  text-yellow-600">
                        Update
                    </button>
                    </div>
                </div>
              ) : (
                ""
              )}

              <hr />

              <h2 className="text-xl font-bold">Comments</h2>
              {
                object.comments.map((comment:any) => (
                    <div key={comment.id} className="mb-4 ">
                    <p className="text-lg">{comment.content}</p>
                    <p className="text-xs text-gray-500">{comment.createdAt.slice(0, 10)}</p>
                    </div>
                ))
              }

              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="md:col-span-1 mx-8 md:mt-[40%] sm:mx-0 invisible md:visible">
              <h1 className="text-md md:text-xl font-bold text-slate-800">
                Author
              </h1>
              <p>{object.author.username}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Post;
