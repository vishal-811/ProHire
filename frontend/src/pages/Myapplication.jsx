import React, { useState, useEffect } from "react";
import axios from 'axios';
import ApplicationCard from "../components/ApplicationCard";
import { useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";

const Myapplication = () => {
    const [applications, setApplications] = useState([]);
    const token = localStorage.getItem("token");
     const role =localStorage.getItem("role");
    useEffect(() => {
        fetchApplications();
    }, []);

    const navigate = useNavigate();
   
    useEffect(()=>{
        if(!token){
          toast.error("please signin")
          navigate('/signin');
      }
      })

    // Function to fetch applications
    const fetchApplications = () => {
         if(role === 'Job seeker'){
            axios.get("http://localhost:3000/api/v1/application/jobseeker/getall", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                console.log(response.data.applications)
                setApplications(response.data.applications);
            }).catch(error => {
                console.log(error);
            });
         }
         else{
            axios.get("http://localhost:3000/api/v1/application/employer/getall",{
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                console.log(response.data.applications)
                setApplications(response.data.applications);
            }).catch(error => {
                console.log(error);
            });
         }
    };

    // Function to remove deleted application from state
    const removeDeletedApplication = (applicationId) => {
        setApplications(applications.filter(application => application._id !== applicationId));
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6">
           {role === "Job seeker" ?  <h1 className="text-4xl font-semibold text-blue-500 mb-8 text-center">My Applications</h1>: <h1 className="text-4xl font-semibold text-blue-500 mb-8 text-center">Applicants Applications</h1>}
             
             {applications.length !==0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((application, index) => (
                    <ApplicationCard
                        key={index}
                        username={application.username}
                        email={application.email}
                        coverletter={application.coverletter}
                        appliedon={application.updatedAt}
                        resumeUrl={application.resume.url}
                        applicationId={application._id}
                        onDelete={() => removeDeletedApplication(application._id)} // Pass onDelete callback
                    />
                ))}
            </div>
             ):(
                <div className="flex flex-col mt-36 justify-center items-center text-gray-800">
                            <p className="text-5xl font-semibold text-red-400">No Applications... </p>
                        </div>
             )}
        </div>
    );
}

export default Myapplication;
