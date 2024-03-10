const express = require('express');
const { Job, User } =require('../database');
const { authMiddleware } = require('../middleware/auth');
const { z } =require('zod');
const router =express.Router();

// const jobpostSchema=z.object({
//       title:z.string(),
//       description:z.string(),
//       category:z.string(),
//       country:z.string(),
//       city:z.string(),
//       pincode:z.number(),
//       expired:z.boolean(),
//       fixedsalary:z.number().optional(),
//       salaryfrom:z.number().optional(),
//       salaryto:z.number().optional(),
//       jobpostedon:z.string().optional(),
//       jobpostedby:z.string(),
// })
router.get('/getall', async (req, res) => {
    try {
        const jobs = await Job.find({ expired: false });

        if (jobs.length === 0) {
           return res.status(200).json({msg:"NO job are avialable"})
        }

        res.status(200).json({ msg: "Jobs fetched successfully", allJobs: jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Route to post a new job 
router.post('/post', authMiddleware, async(req,res)=>{
              // const  response=jobpostSchema.safeParse(req.body);
              
              // if(!response.success){
              //  return res.status(401).json({msg:"Please fill all the details"})
              // } 
        try {
            const userId =req.userId;
         const existuser =await User.findById({_id:userId});
         if(!existuser){
            return res.status(401).json({msg:"user does not exist"})
         }
         const role =existuser.role;
             if(role!='Employer'){
                return res.status(411).json({msg:"You cannot acces this feature"});
             }
             
               const{salaryfrom,salaryto ,fixedsalary}=req.body;
               console.log(salaryfrom,salaryto,fixedsalary);
               if((!salaryto || !salaryfrom) && !fixedsalary){
                 return res.status(411).json({msg:"Please either provide a fixed salary or ranged salary"})
               }
              else if((salaryto && salaryfrom) && fixedsalary){
                return  res.status(411).json({msg:"Cannot enter both the fixed salary and ranged salary together"})
               }

       const newjob = await Job.create({
           title:req.body.title,
           description:req.body.description,
           category:req.body.category,
           country:req.body.country,
           city:req.body.city,
           pincode:req.body.pincode,
           expired:req.body.expired,
           fixedsalary:req.body.fixedsalary,
           salaryfrom:req.body.salaryfrom,
          salaryto:req.body.salaryto,
          jobpostedon:req.body.jobpostedon,
         jobpostedby:req.body.jobpostedby
       })
        res.status(201).json({msg:"Job posted successfully",data:newjob})
        } catch (error) {
            console.error(error);
             res.status(411).json({msg:"something went wrong"})
        }
})

// To get a posted job of a particular employer
router.get('/myposts',authMiddleware , async(req,res)=>{
    try {
        const userId = req.userId ;
        const { role }  =await User.findById({_id:userId});

         if(role!='Employer'){
          return res.status(411).json({msg:"you are not allowed to access"})
        }
      const myjobs=await Job.find({jobpostedby: userId});
      res.status(200).json({success:true , data:myjobs})
    } catch (error) {
        res.status(411).json({msg:"Something went wrong"})
    }
})

// Update router
router.put('/update/:id',authMiddleware,async(req,res)=>{
      try {
        const id =req.params.id;
      const userId =req.userId;
      const user =await User.findById(userId)
      const role =user.role;
      if(role!='Employer'){
        return res.status(411).json({msg:"you cannot update this job"});
      }
      
      let job = await Job.findById(id);
      if(!job){
        return res.status(411).json({msg:"OOps! job not found"})
      }
      job =await Job.findByIdAndUpdate(id,req.body,{
           new:true,
           runValidators: true,  // this is used to validate the mongoose about the required[],min and all.
           useFindAndModify: false,
      })
      res.status(201).json({success:true,msg:"job updated!"})
      } catch (error) {
          console.error(error);
      }

})

// delete router 
router.delete('/delete/:id', authMiddleware, async (req, res) => {
     try {
      const userId =req.userId;
      const existuser =await User.findById({_id:userId})
      if(!existuser){
       return res.status(411).json({msg:"user doesnot exist with this credentails"});
      }
 
      const role =existuser.role;
      if(role!='Employer'){
         return res.status(411).json({msg:"You are not allowed to do this"});
      }
      const id =req.params.id;
      const findJob =await Job.findById(id);
      if(!findJob){
         res.status(401).json({msg:"No job found with this id"});
      }
        await Job.deleteOne({_id:id})
        res.status(200).json({msg:"Job deleted succesfully"})
     } catch (error) {
         res.status(411).json({msg:"something went wrong"})
     }
})

// get single job
router.get('/:id',authMiddleware , async(req,res)=>{
     const id =req.params.id;

    try {
      const job = await Job.findById(id);
      if(!job){
        return res.status(401).json({msg:"No job found"});
      }
      res.status(200).json({success:"true" , data:job});
    } catch (error) {
        res.status(411).json({msg:"something went wrong"})
    }
})

module.exports=router;