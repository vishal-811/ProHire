const express = require('express');
const { Job, User } =require('../database');
const { authMiddleware } = require('../middleware/auth');
const { z } =require('zod');
const router =express.Router();

const jobpostSchema=z.object({
      title:z.string(),
      description:z.string(),
      category:z.string(),
      country:z.string(),
      city:z.string(),
      pincode:z.number(),
      expired:z.boolean(),
      fixedsalary:z.number().optional(),
      salaryfrom:z.number().optional(),
      salaryto:z.number().optional(),
      jobpostedon:z.string().optional(),
      jobpostedby:z.string(),
})
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

router.post('/post', authMiddleware, async(req,res)=>{
       const { success } =jobpostSchema.safeParse(req.body);
       if(!success){
        return res.status(401).json({msg:"Please fill all the details"})
       }
         
        try {
            const userId =req.userId;
         const existuser =await User.findById({_id:userId});
         if(!existuser){
            return res.status(401).json({msg:"user does not exist"})
         }
         const role =existuser.role;
             if(role!='Employer'){
                return res.status(411).json({msg:"user cannot acces this feature"});
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
        res.status(201).json({msg:"Job posted successfully"})
        } catch (error) {
            console.error(error);
             res.status(411).json({msg:"something went wrong"})
        }
})


module.exports=router;