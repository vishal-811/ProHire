import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const ApplicationCard = ({ username, email, coverletter, appliedon, resumeUrl ,applicationId}) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const token =localStorage.getItem("token");

    const handleOverlayToggle = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };

    const deletehandler=async ()=>{
         try {
            const id =applicationId;
        const response=await axios.delete(`http://localhost:3000/api/v1/application/jobseeker/delete/${id}`,{
            headers:{
                authorization:"Bearer "+token
            }
        })
       if(response.status===200){
          toast.success(response.data.msg);
          navigate('/myapplications');
       }
         } catch (error) {
             toast.error(error.response.data.msg)
         }
    }

    return (
        <>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-4 transition duration-300 transform hover:shadow-xl border-2 solid border-blue-300">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Application Details</h2>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <p className="text-gray-600 text-lg font-semibold">{username.charAt(0)}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-700">Name:</p>
                            <p className="text-gray-800">{username}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Email:</p>
                        <p className="text-gray-800">{email}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Cover Letter:</p>
                        <p className="text-gray-800">{coverletter}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Applied On:</p>
                        <p className="text-gray-800">{appliedon}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-700">Resume:</p>
                        <img onClick={handleOverlayToggle} src={resumeUrl} className="w-2/4 h-64 cursor-pointer" title="Resume" alt="Resume" />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={deletehandler} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none">
                        Delete
                    </button>
                </div>
            </div>
            {isOverlayOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
                            <button onClick={handleOverlayToggle} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-auto max-h-96">
                            <img src={resumeUrl} className="w-full" alt="Resume" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ApplicationCard;
