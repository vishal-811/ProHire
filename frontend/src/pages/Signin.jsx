import React, { useState, useEffect } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import LabelInputContainer from "../components/LabelInputContainer";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import RoleSelector from "../components/Role";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

const Signin = () => {
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

    const handleSignin = async () => {
        // Validate input fields
        if (!email || !password) {
            alert("Please fill in all the fields.");
            return;
        }

        // Proceed with signin
        setIsLoading(true); // Set loading state to true when signin starts
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                email,
                password,
                role
            });
            if (response.status === 201) {
                console.log(response.data.msg);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role' , role);
                navigate('/');
                toast.success(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
        setIsLoading(false); // Set loading state to false when signin finishes
    };

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
                        <LabelInputContainer onchange={(e) => { setEmail(e.target.value) }} label={"Email"} placeholder={"Enter your email"} />
                        <LabelInputContainer onchange={(e) => { setPassword(e.target.value) }} label={"Password"} placeholder={"Enter your Password"} />
                        <RoleSelector onchange={(e) => { setRole(e.target.value) }} />
                        <Button
                            onclick={handleSignin}
                            label={isLoading ? "Please wait..." : "Sign in"} // Show "Please wait..." label when isLoading is true
                        />
                        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
