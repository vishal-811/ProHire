// EmployerJob.js

import axios from 'axios';
import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmployerJob = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/job/myposts', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response.data);
            if (response.data.success) {
                setJobs(response.data.data);
                toast.success('Your Jobs');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error(error.response.data.msg)
        });
    }, [token]);

    const colors = ['#e3dbfa', '#fbe2f4', '#ffe1cc', '#d4f6ed', '#eceff4', '#dff3fe'];

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className='flex flex-col  justify-center px-4 py-8 bg-gray-100 min-h-screen'>
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Your Posted Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
                {jobs.map((job, index) => (
                    <div key={index}>
                        <JobCard
                            title={job.title}
                            description={job.description}
                            country={job.country}
                            postedon={job.jobpostedon}
                            salary={job.fixedsalary || job.salaryfrom}
                            color={colors[Math.floor(Math.random() * colors.length)]}
                        />
                    </div>
                ))}
            </div>
            <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleGoBack}>
                Go Back to Home
            </button>
        </div>
    );
}

export default EmployerJob;
