import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

// schema 
const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  link:z.string(),
  authorId: z.number(),
});

const commentSchema = z.object({
    content: z.string().min(1),
    userId: z.number(),
    postId: z.number(),
});

// Create a new post
router.post("/add", async (req, res) => {
  try {
   
    const data:any = postSchema.safeParse(req.body);
    console.log(data.data);
    
    if (!data.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const post = await prisma.post.create({
      data: data.data,
    });
    console.log(post);
    

    res.status(200).json(post);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// Get a single post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
        likes:true,
        comments:true
      },
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    console.log(post);
    

    res.status(200).json(post);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// Update a post by ID
router.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = postSchema.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: data.data,
    });

    res.status(200).json(post);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

// Delete a post by ID
router.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    await prisma.like.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    // Delete comments associated with the post
    await prisma.comment.deleteMany({
      where: {
        postId: parseInt(id),
      },
    });

    // Delete the post
    
    await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });


    res.status(204).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});


  
// Like a post
router.post("/posts/:id/like", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const data = req.body;
  
      const like = await prisma.like.create({
        data: {
          postId,
          userId:parseInt(data.userId)
        },
      });
  
      res.status(201).json(like);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Failed to like post" });
    }
});
  
// Add a comment to a post
router.post("/posts/:id/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      
      const data = commentSchema.safeParse({ ...req.body, postId });
      console.log(data);
      
      if (!data.success) {
        res.status(400).json({ message: "Invalid data" });
        return;
      }
  
      const comment = await prisma.comment.create({
        data: data.data,
      });
  
      res.status(201).json(comment);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Failed to add comment" });
    }
});

export { router as PostRoute };
