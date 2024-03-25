import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const JobDetails = () => {
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(false);
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/job/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            if(response.status === 200) {
                setJob(response.data.data);
            }
        })
        .catch(error => {
            toast.error(error.message);
        });
    }, [id, token]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const onApplyHandler = () => {
        setLoading(true);
        setTimeout(() => {
            alert("You have successfully applied for this job!");
            setLoading(false);
        }, 2000);
    };
    
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 border border-blue-600 rounded-lg shadow-lg">
                <div className="p-6">
                    <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
                    <ul className="space-y-4 text-lg font-sans">
                        <li><strong>Category:</strong> {job.category}</li>
                        <li><strong>Location:</strong> {job.city}, {job.country} ({job.pincode})</li>
                        <li><strong>Description:</strong> {job.description}</li>
                        <li><strong>Posted On:</strong> {formatDate(job.jobpostedon)}</li>
                        <li><strong>Salary:</strong> {job.fixedsalary ? `$${job.fixedsalary}` : `$${job.salaryfrom} - $${job.salaryto}`}</li>
                    </ul>
                    {userRole === "Job seeker" && (
                        <button
                            onClick={onApplyHandler}
                            className={`mt-6 px-6 py-3 bg-blue-500 text-white rounded-md focus:outline-none transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            disabled={loading}
                        >
                            {loading ? "Applying..." : "Apply Now"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobDetails;
