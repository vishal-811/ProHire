require('dotenv').config();
const mongoose =require('mongoose');
const { boolean } = require('zod');
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true , "username is required"],
        minLength:[4,"Username is too short"],
        maxLength:[30,"username is too long"]
    },
    email:{
        type:String,
        required:[true , "email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    role:{
        type:String,
        required:[true , 'user type is required'],
        enum:["Job seeker","Employer"]
    }
},{
    timestamps:true
})
 
const jobSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title for job is required"]
    },
    description:{
        type:String,
        required:[true ,"Job description is required"]
    },
    category:{
         type:String,
         required:[true,"Please provide the category of job"]
    },
    country:{
        type:String,
        required:[true , "Job country is required"]
    },
    city:{
        type:String,
        required:[true,"Job city is required"]
    },
    pincode:{
        type:Number,
        required:[true,"Exact Job location is required"]
    },
    fixedsalary:{
        type:Number,
        minLength:[4,"Minimum 4 digit salary"]
    },
    salaryfrom:{
        type:Number,
        minLength:[4,"Minimum 4  digit salary"]
    },
    salaryto:{
        type:Number,
        minLength:[4,"minimum 4 digit salary"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobpostedon:{
        type:Date,
        default:Date.now()
    },
    jobpostedby:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
})

  const applicationSchema = new mongoose.Schema({
       username:{
          type:String,
          required:[true,"username is required"]
       },
       email:{
          type:String,
          required:[true,"email is required"]
       },
       coverletter:{
          type:String,
          required:[true,"Please provide a cover letter"]
       },
       resume:{
          public_id:{
            type:String,
            required:true
          },
         url:{
            type:String,
            required:true
         }
       },
       applicantId:{
          user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"User",
             required:true
          },
          role:{
             type:String,
             enum:["Job seeker"],
             required:true
          }
       },
       employerId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Job",
         required:true
       },
       role:{
         type:String,
         enum:["employer"],
         required:true
       }
  })

const User =mongoose.model('User' , userSchema);
const Job =mongoose.model('Job' , jobSchema);
const Application =mongoose.model('Application' , applicationSchema);

module.exports={
    User,
    Job,
    Application
}