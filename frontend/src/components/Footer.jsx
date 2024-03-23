 import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="bg-black flex justify-between select-none flex-col">
              
            <div className="flex justify-between">
                <div className="ms-24 mt-24">
                    <p className="text-white text-6xl font-semibold">Work With The <br/>Skills You Have!</p>
                </div>

                <div className="me-24 mt-24 space-y-20">
                    <p className="text-3xl text-gray-400">What are you waiting for? let's make your <br/> dream come true with us. We will make it easier <br/> for you to find your dream job!</p>
                    <Link to={'/alljobs'} className=" w-40 ps-10 mt-8 py-3 px-6 bg-white hover:bg-gray-200 text-gray-600 text-lg font-semibold rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-gray-400 flex items-center">
                        Let's Start
                    </Link>
                </div>
            </div>
              
            {/* Gray line here */}
            <div className=" w-4/5 mx-auto">
                <hr className="border-gray-600 mt-24" />
          </div>


            <div className="flex justify-between select-none">
                <div className="ms-24 space-y-10 mt-44">
                    <p className="text-white text-4xl font-semibold">ProHire</p>
                    <p className="text-slate-400 text-2xl">Make your dreams come true with us.
                    <br/>
                        Easy to Use, Easy to apply!
                    </p>
                </div>
                <div className="text-gray-400 flex me-40 space-x-14 mt-60">
                    <ul className="space-y-6">
                        <li className="hover:text-blue-400 cursor-pointer">Home</li>
                        <li className="hover:text-blue-400 cursor-pointer">About</li>
                        <li className="hover:text-blue-400 cursor-pointer">How It Works</li>
                        <li className="hover:text-blue-400 cusror-pointer">Find Jobs</li>
                    </ul>
                    <ul className="space-y-6">
                        <li className="hover:text-blue-400 cursor-pointer">Linkedin</li>
                        <li className="hover:text-blue-400 cursor-pointer">Github</li>
                    </ul>
                    <ul className="space-y-6">
                        <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-blue-400 cursor-pointer">Terms & Condition</li>
                        <li className="hover:text-blue-400 cursor-pointer">FAQ</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
