import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import NewPassword from "./pages/NewPassword"
import Posts from "./pages/Posts"
import Home from "./pages/Home"
import Publish from "./pages/Publish"
import Post from "./pages/Post"

function App() {
 
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/post/:id" element={<Post/>}></Route>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/newPassword" element={<NewPassword/>}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
