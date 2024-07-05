import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// schemas
const signupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(4).max(10)
});

const signinSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(4).max(10)
});

const resetPasswordSchema = z.object({
    email: z.string().email()
});

const newPasswordSchema = z.object({
    token: z.number(),
    email:z.string().email(),
    password: z.string().min(4).max(10)
});

const router = Router();

// SignUp
router.post("/signup", async (req, res) => {
    try {
        const data = signupSchema.safeParse(req.body);
        if (!data.success) {
            res.status(411).json({ message: "Failed To Signup" });
            return;
        }

   
        const hashed = await bcrypt.hash(data.data.password, 10);

        const response = await prisma.user.create({
            data: {
                email: data.data.email,
                username: data.data.username,
                password: hashed
            }
        });

        
        res.status(200).json(response);

    } catch (e) {
        console.log("Error:", e);
        res.status(411).json({ message: "Failed To Signup" });
    }
});

// SignIn
router.post("/signin", async (req, res) => {
    try {
        const data = signinSchema.safeParse(req.body);
      
        if (!data.success) {
            res.status(411).json({ message: "Failed To Signin" });
            return;
        }
      
        const response = await prisma.user.findUnique({
            where: {
                username:data.data.username
            }
        });
       
       
        const compare = await bcrypt.compare(data.data.password, response?.password || "");
        if (!compare) {
            res.status(422).json({ message: "Wrong Password" });
            return;
        }
       

        res.status(200).json(response);

    } catch (e) {
        console.log("Error:", e);
        res.status(411).json({ message: "Failed To Signin" });
    }
});

// Password Reset Request
router.post("/reset-password", async (req, res) => {
    try {
        const data = resetPasswordSchema.safeParse(req.body);
        if (!data.success) {
            res.status(411).json({ message: "Invalid Email" });
            return;
        }

       
        const user = await prisma.user.findUnique({
            where: {
                email: data.data.email
            }
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Generate a reset token 

        const token = "1234";

        // you would send the token to the user email

        console.log("Reset Token:", token);

        res.status(200).json({ message: "Password reset token generated" });

    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ message: "Failed To Reset Password" });
    }
});

// Set New Password
router.post("/newpassword", async (req, res) => {
    try {
        const data = newPasswordSchema.safeParse(req.body);
       
        if (!data.success) {
            res.status(411).json({ message: "Invalid Data" });
            return;
        }
        console.log(data);
        
  
        // match the token here 

        const hashed = await bcrypt.hash(data.data.password, 10);

        await prisma.user.update({
            where: {
                email:data.data.email
            },
            data: {
                password: hashed
            }
        });

        res.status(200).json({ message: "Password updated successfully" });

    } catch (e) {
        console.log("Error:", e);
        res.status(500).json({ message: "Failed To Update Password" });
    }
});

export { router as SigninRouter };
