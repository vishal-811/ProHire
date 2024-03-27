import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { toast } from "react-toastify";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="bg-black h-16 flex items-center px-6 ">
            <div className="flex items-center">
                <a href="/">
                    <img 
                        src={logo}
                        alt="job-logo"
                        className="w-36 h-12 mr-2 select-none cursor-pointer rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                    />
                </a>
            </div>

            {/* Hamburger menu icon for mobile */}
            <div className="ml-auto md:hidden">
                <button onClick={toggleMenu} className="text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Menu items */}
            <ul className={`text-white flex items-center space-x-12 ml-auto md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
                <li className=" hover:text-blue-300">
                    <Link to={'/'}>Home</Link>
                </li>
                <li className=" hover:text-blue-300">
                    <Link to={'/alljobs'}>All Jobs</Link>
                </li>
                <li className="hover:text-blue-300">
               <Link to={userRole === 'Employer' ? '/applicantsapplication' : '/myapplications'}>
                   {userRole === 'Employer' ? 'Applicants Application' : 'My Application'}
               </Link>
</li>
                {/* Show only if our userRole is employer */}
                {userRole === 'Employer' && (
                    <>
                        <li className=" hover:text-blue-300">
                            <Link to={'/postjob'}>Post Job</Link>
                        </li>
                        <li className=" hover:text-blue-300">
                            <Link to={'/myposts'}>View Your Job</Link>
                        </li>
                    </>
                )}
                <li>
                    <button onClick={async () => {
                        const res = localStorage.clear('token', 'user');
                        navigate('/signin');
                        toast.success('logged out successfully');
                    }} className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none shadow-md hover:shadow-lg">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
