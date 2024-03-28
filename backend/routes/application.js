const multer = require('multer');
const upload = multer().single('resume');
const express = require('express');
const {Job, User, Application} =require('../database/index');
const { authMiddleware } = require('../middleware/auth');
const cloudinary =require('cloudinary');
const router =express.Router();


// Route to post the application by the Job seeker
router.post('/post',authMiddleware , upload, async(req,res)=>{
      const id =req.userId;
      const userRole = await User.findById(id);
      if(userRole.role==='Employer'){
        return res.status(411).json({msg:"You are not allowed to access this resource"});
      }

      if(!req.file || Object.keys(req.file).length===0){  // when resume file is not provided
           return res.status(401).json({msg:"please upload resume"});
      }

      try {
        const  resume  =req.file;
      const allowedFormats = ['image/png', 'image/jpeg', 'image/webp'];
      if(!allowedFormats.includes(resume.mimetype)){   //mimetypes means .png , .jpg
          return res.status(411).json({msg:"No such files are supported,Please provide .png/.jpg files"})
      }
        //  console.log(resume.originalname);
      const cloudinaryResponse =await new Promise((resolve) => {
        cloudinary.v2.uploader.upload_stream((error, cloudinaryResponse) => {
            return resolve(cloudinaryResponse);
        }).end(resume.buffer);
    });
       
      if(!cloudinaryResponse){
        return res.status(411).json({msg:"Resume not uploaded!"})
      }
        // console.log(cloudinaryResponse);
      const {username , email , coverletter ,jobId} = req.body;
      
      const applicantId={
          user:req.userId,
          role:"Job seeker"
      }

      const jobdetails = await Job.findById(jobId);
      if(!jobdetails){
        return  res.status(411).json({msg:"No job found "});
      }

      const employerId = {
        user: jobdetails.jobpostedby,
        role: "Employer",
      };

      if(!username || !email || !coverletter || !applicantId || !employerId){
        return res.status(411).json({msg:"Please fill all the fields"})
      }

      const newapplication = await Application.create({
          username,
          email,
          coverletter,
          applicantId,
          employerId,

          resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
          },
      });

      res.status(200).json({msg:"Application submitted"})
      } catch (error) {
          console.error(error);
          return res.status(411).json({msg:"Something went wrong"})
      }

})

// Route to get all the applications of the job-seeker
router.get('/employer/getall',authMiddleware , async(req,res)=>{
     const id =req.userId;
     const userRole = await User.findById(id);
     if(userRole.role=="Job seeker"){
        return res.status(411).json({msg:"Job Seeker are not allowed to do this action"})
     }
     const applications = await Application.find({"employerId.user":id})
     res.status(200).json({success:true , applications})
})

// Route to see all the appliactions where the job-seeker applied for jobs.
router.get('/jobseeker/getall',authMiddleware,async(req,res)=>{
      const id=req.userId;
      const userRole = await User.findById(id);
      if(userRole.role==='Employer'){
        return res.status(411).json({msg:"Employer are not allowed to do this action"});
      }

      const applications = await Application.find({"applicantId.user":id});
      console.log(applications);
      res.status(200).json({success:true , applications});

})

// Route to delete the job appkications by the Job-seeker
router.delete('/jobseeker/delete/:id', authMiddleware , async(req,res)=>{
      try {
        const userid = req.userId;
      const userRole = await User.findById(userid);
      if(userRole.role ==='Employer'){
        return res.status(411).json({msg:"Employer are not allowed to perform  this"});
      }
      const { id } =req.params;
      const existapplication = await Application.findById(id);
      if(!existapplication){
        return res.status(411).json({msg:"Application not found"});
      }
      await existapplication.deleteOne();
      res.status(200).json({success:true , msg:"Application Deleted!"});
      } catch (error) {
          console.error(error)
          return res.status(411).json({msg:"Something went wrong"})
      }
})
module.exports=router;