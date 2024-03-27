import React, { useState, useEffect } from "react";
import axios from 'axios';
import ApplicationCard from "../components/ApplicationCard";

const Myapplication = () => {
    const [applications, setApplications] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchApplications();
    }, []);

    // Function to fetch applications
    const fetchApplications = () => {
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
    };

    // Function to handle delete operation
    const handleDelete = async (applicationId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/application/jobseeker/delete/${applicationId}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            if (response.status === 200) {
                // If delete successful, fetch updated list of applications
                fetchApplications();
            }
        } catch (error) {
            console.error("Error deleting application:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6">
            <h1 className="text-4xl font-semibold text-blue-500 mb-8 text-center">My Applications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((application, index) => (
                    <ApplicationCard
                        key={index}
                        username={application.username}
                        email={application.email}
                        coverletter={application.coverletter}
                        appliedon={application.updatedAt}
                        resumeUrl={application.resume.url}
                        // applicationId={application._id}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default Myapplication;
