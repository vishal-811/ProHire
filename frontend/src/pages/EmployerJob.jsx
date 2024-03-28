
import axios from 'axios';
import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmployerJob = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [jobs, setJobs] = useState([]);

    useEffect(()=>{
        if(!token){
          toast.error("please signin")
          navigate('/signin');
      }
      })

    useEffect(() => {
        axios.get('https://prohire-oxdr.onrender.com/api/v1/job/myposts', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response.data);
            if (response.data.success) {
                console.log(response.data.data)
                toast.success('Your Jobs');
                setJobs(response.data.data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error(error.response.data.msg)
        });
    }, [token]);

    const colors = ['#ceb7f1', '#f4cbea', '#ffbfa5', '#a7edd9', '#d5dae3', '#c0e7fd', '#c9b0eb', '#e7b1df', '#ffb09d', '#a5dbcf'];

    const handleGoBack = () => {
        navigate('/');
    };
     
    return (
        <div className='flex flex-col justify-center bg-gray-100 min-h-screen'>
            <h2 className="text-7xl font-bold text-center text-blue-800">
                Your Posted Jobs
            </h2>
    
            <div className="max-w-6xl flex justify-center pt-24 pb-12">
                {jobs.length !== 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {jobs.map((job, index) => (
                            <div key={index}>
                                <JobCard
                                    title={job.title}
                                    category={job.category}
                                    country={job.country}
                                    postedon={job.jobpostedon}
                                    salary={job.fixedsalary || job.salaryfrom}
                                    jobid={job._id}
                                    color={colors[Math.floor(Math.random() * colors.length)]}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col ms-96 justify-center items-center text-gray-800">
                        <p className="text-5xl font-semibold text-red-400">No jobs found...</p>
                    </div>
                )}
            </div>
    
            <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleGoBack}>
                Go Back to Home
            </button>
        </div>
    );
    
    
    
}

export default EmployerJob;
