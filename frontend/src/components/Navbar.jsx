import { Link, useNavigate} from "react-router-dom";
import logo from '../assets/logo.png';
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate =useNavigate();
    const userRole = localStorage.getItem('role');
    return (
        <div className="bg-black h-16 border-b-2 solid border-gray-400 flex items-center px-6">
            <div className="flex items-center">
               <a href="/">
        <img 
        src={logo} 
        alt="job-logo" 
        className="w-36 h-12 mr-2 select-none cursor-pointer rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
    />
</a>

            </div>
            <ul className="text-white flex items-center space-x-12 ml-auto">
                <li className=" hover:text-blue-300">
                    <Link to={'/'}>Home</Link>
                </li>
                <li className=" hover:text-blue-300">
                    <Link to={'/'}>All Jobs</Link>
                </li>
                <li className=" hover:text-blue-300">
                    <Link to={'/'}>{userRole === 'Employer' ?'Applicants Application' : 'My Application'}</Link>
                </li>
                
                  {/* Show only if our userRole is employer */}
                    {userRole==='Employer'?(
                        <>
                        <li className=" hover:text-blue-300">
                      <Link to={'/'}>Post Job</Link>
                        </li>
                    <li className=" hover:text-blue-300">
                    <Link to={'/'}>View Your Job</Link>
                    </li>
                        </>
                    ):<></>}
                <li>
                  <button onClick={async()=>{
                     const res = localStorage.clear('token' ,'user');
                     navigate('/signin');
                     toast.success('logged out successfully')
                  }} className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none shadow-md hover:shadow-lg">
                          Logout
                  </button>
                </li>
            </ul>  
        </div>
    );
}

export default Navbar;
