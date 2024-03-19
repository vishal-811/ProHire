import React, { useState, useEffect } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import LabelInputContainer from "../components/LabelInputContainer";
import RoleSelector from "../components/Role";
import Subheading from "../components/Subheading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("Job seeker");
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state to track loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Delay the appearance of the text to create a smoother animation
        const timer = setTimeout(() => {
            setIsTextVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleSignup = async () => {
        // Validate input fields
        if (!username || !email || !password) {
            alert("Please fill in all the fields.");
            return;
        }

        // Proceed with signup
        setIsLoading(true); // Set loading state to true when signup starts
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                username,
                email,
                password,
                role
            });
            if (response.status === 201) {
                localStorage.setItem("token", response.data.token ,"role",role);
                navigate('/signin');
                console.log(response.data.msg);
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.response.data.msg)
        }
        setIsLoading(false); // Set loading state to false when signup finishes
    };

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
                        <LabelInputContainer onchange={(e) => { setUsername(e.target.value) }} label={"Username"} placeholder={"Enter your username"} />
                        <LabelInputContainer onchange={(e) => { setEmail(e.target.value) }} label={"Email"} placeholder={"Enter your Email"} />
                        <LabelInputContainer onchange={(e) => { setPassword(e.target.value) }} label={"Password"} placeholder={"Enter your password"} />
                        <RoleSelector onchange={(e) => { setRole(e.target.value) }} />
                        <Button
                            onclick={handleSignup}
                            label={isLoading ? "Please wait..." : "Sign up"} // Show "Please wait..." label when isLoading is true
                        />
                        <BottomWarning label={"Already have an account?  "} buttonText={"Sign in"} to={'/signin'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
