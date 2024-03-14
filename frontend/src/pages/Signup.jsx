import React, { useState, useEffect } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import LabelInputContainer from "../components/LabelInputContainer";
import RoleSelector from "../components/Role";
import Subheading from "../components/Subheading";

const Signup = () => {
    const [role, setRole] = useState("Job Seeker");
    const [isTextVisible, setIsTextVisible] = useState(false);

    useEffect(() => {
        // Delay the appearance of the text to create a smoother animation
        const timer = setTimeout(() => {
            setIsTextVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-black h-screen flex justify-end">
            <div className={`text-blue-700  flex justify-center items-center me-96 font-sans font-extrabold text-7xl transform transition-transform duration-1000 ${isTextVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                 ProHire
            </div>
            <div className="w-2/5">
                <div className="rounded-lg bg-white text-center p-2 h-full px-4 w-full">
                    <div className="mt-24">
                    <Heading label={"Sign Up"} />
                    <Subheading label={"Enter your information to create an account"} />
                    <LabelInputContainer label={"Username"} placeholder={"Enter your username"} />
                    <LabelInputContainer label={"Email"} placeholder={"Enter your Email"} />
                    <LabelInputContainer label={"Password"} placeholder={"Enter your password"} />
                    <RoleSelector onchange={(e) => { setRole(e.target.value) }} />
                    <Button label={"Sign up"} />
                    <BottomWarning label={"Already have an account?  "} buttonText={"Sign in"} to={'/signin'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
