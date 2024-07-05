import express from "express";
import { SigninRouter } from "./routes/signIn";
import { PostRoute } from "./routes/post";
import cors from "cors";

const app=express();
const PORT=3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",SigninRouter);
app.use("/post",PostRoute);


app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}!`);
})