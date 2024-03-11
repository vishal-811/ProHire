const express = require('express');
const {Job, User, Application} =require('../database/index');
const { authMiddleware } = require('../middleware/auth');
const router =express.Router();

router.get('/employer/getall',authMiddleware , async(req,res)=>{
     const id =req.userId;
     const userRole = await User.findById(id);
     if(userRole.role=="Job seeker"){
        return res.status(411).json({msg:"Job Seeker are not allowed to do this action"})
     }
     const applications = await Application.find({"employerId.user":id})
     res.status(200).json({success:true , applications})
})

router.get('/jobseeker/getall',authMiddleware,async(req,res)=>{
      const id=req.userId;
      const userRole = await User.findById(id);
      if(userRole.role==='Employer'){
        return res.status(411).json({msg:"Employer are not allowed to do this action"});
      }

      const applications = await Application.find({"employerId.user":id});
      res.status(200).json({success:true , applications});

})

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
      }
})
module.exports=router;