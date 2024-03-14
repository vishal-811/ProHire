import React, { useState, useEffect } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import LabelInputContainer from "../components/LabelInputContainer";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import RoleSelector from "../components/Role";

const Signin = () => {
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
        <div className={`text-blue-700 flex justify-center items-center me-96 font-sans font-extrabold text-7xl transform transition-transform duration-1000 ${isTextVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
             ProHire
        </div>
        <div className="w-2/5">
            <div className="rounded-lg bg-white text-center p-2 h-full px-4 w-full">
                    <div className="mt-24">
                    <Heading label={"Sign in"} />
                    <Subheading label={"Enter your credentials to access your account"} />
                    <LabelInputContainer label={"Email"} placeholder={"Enter your email"} />
                    <LabelInputContainer label={"Password"} placeholder={"Enter your Password"} />
                    <RoleSelector onchange={(e) => { setRole(e.target.value) }} />
                    <Button label={"Sign in"} />
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
