require('dotenv').config();
const mongoose =require('mongoose');
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


const User =mongoose.model('User' , userSchema);
// const Job =mongoose.model('Job' , jobSchema);
// const Appliaction =mongoose.model('Application' , applicationSchema);

module.exports={
    User,
    // Job,
    // Appliaction
}