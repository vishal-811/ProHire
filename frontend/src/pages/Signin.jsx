import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import LabelInputContainer from "../components/LabelInputContainer";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import RoleSelector from "../components/Role";
import { useState } from "react";

const Signin=()=>{
    const[role,setRole]=useState("Job Seeker");
    return(
    <div className="bg-gray-300 h-screen flex justify-center">
           <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white text-center p-2 h-max px-4 w-80">
                 <Heading label={"Sign in"}/>
                 <Subheading label={"Enter your credentials to access your account"}/>
                 <LabelInputContainer label={"Email"} placeholder={"Enter your email"}/>
                 <LabelInputContainer label={"Password"} placeholder={"Enter your Password"}/>
                 <RoleSelector onchange={(e)=>{setRole(e.target.value)}}/>
                 <Button label={"Sign in"}/>
                 <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'}/>
            </div>
        </div>
     </div>
)}


export default Signin;