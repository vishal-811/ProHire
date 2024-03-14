import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import LabelInputContainer from "../components/LabelInputContainer";
import RoleSelector from "../components/Role";
import Subheading from "../components/Subheading";

const Signup=()=>{
     const[role,setRole]=useState("Job Seeker");
     return(
       <div className="bg-gray-300 h-screen flex justify-center">
           <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white text-center p-2 h-max px-4 w-80">
                <Heading label={"Sign Up"}/>
                <Subheading label={"Enter your information to create an account"}/>
                <LabelInputContainer label={"Username"} placeholder={"Enter your username"} />
                <LabelInputContainer label={"Email"} placeholder={"Enter your Email"}/>
                <LabelInputContainer label={"password"} placeholder={"Enter your password"}/>
                <RoleSelector onchange={(e)=>{setRole(e.target.value)}}/>
                <Button label={"Sign up"} />
                <BottomWarning label={"Already have an account?  "} buttonText={"Sign in"} to={'/signin'} />
                </div>
           </div>
       </div>
     )
}

export default Signup;