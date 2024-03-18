require('dotenv').config();
const express = require('express');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const { z } = require('zod');
const { User } = require('../database');
const { authMiddleware } = require('../middleware/auth');
const router =express.Router();

const signupSchema =z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string().min(6),
    role:z.string()
})

const signinSchema =z.object({
    email:z.string(),
    password:z.string(),
    role:z.string()
})

// Signup Router
router.post('/signup' , async(req,res)=>{
     const { success } =signupSchema.safeParse(req.body);
     if(!success){
       return res.status(411).json({msg:"Invalid inputs"});
     } 

     const alreadyexist = await User.findOne({email:req.body.email});
     if(alreadyexist){
       return res.status(411).json({msg:"User already exist with this credentials"})
     }
         try {
            const password =req.body.password;
            const hashpassword =await bcrypt.hash(password,10); 
           
             const newuser = await User.create({
                username:req.body.username,
                email:req.body.email,
                password:hashpassword,
                role:req.body.role
           })
          
               const userId =newuser._id;
               
           const token= jwt.sign({userId}, process.env.JWT_SECRET);
           
           res.status(201).json({msg:"User Signup successfully" , token:token});
         } catch (error) {
             console.error(error);
             res.status(411).json({msg:"something went wrong"})
         }
})

// Signin Router
router.post('/signin' , async(req,res)=>{
     const { success } = signinSchema.safeParse(req.body);
     if(!success){
       return  res.status(411).json({msg:"Inavlid inputs"})
     }
     const user =await User.findOne({email:req.body.email});
     if(!user){
       return res.status(411).json({msg:"user doesn't exist with this credentials, Please Signup!"})
     }

     const password =user.password;
     const verifyPass =await bcrypt.compare(req.body.password,password)
     if(!verifyPass){
       return res.status(411).json({msg:"Wrong password"});
     }
     const role =user.role;
     if(req.body.role!=role){
       return  res.status(411).json({msg:"Role doesn't match"})
     }
        const userId =user._id;
        const token =jwt.sign({userId},process.env.JWT_SECRET);
         res.status(201).json({msg:"User Signin Succesfully",token:token})
})

// logout functionality handle on frontend.
router.get('/logout',authMiddleware ,(req,res)=>{
    return  res.status(200).json({success:true,msg:"logout successfully"});
})


module.exports=router;