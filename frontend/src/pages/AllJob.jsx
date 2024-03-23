import axios from 'axios';
import JobCard from '../components/JobCard';
import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllJob=()=>{
        const [jobs, setJobs] = useState([]);
         const navigate =useNavigate();
        function handleGoBack(){
             navigate('/');
        }

        useEffect(() => {
            axios.get('http://localhost:3000/api/v1/job/getall')
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.allJobs);
                        setJobs(response.data.allJobs);
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error("Failed to fetch jobs");
                });
        }, []);

        const colors = ['#ceb7f1', '#f4cbea', '#ffbfa5', '#a7edd9', '#d5dae3', '#c0e7fd', '#c9b0eb', '#e7b1df', '#ffb09d', '#a5dbcf'];

        return (
            <div className='flex flex-col justify-center bg-gray-100 min-h-screen'>
                <h2 className="text-7xl font-bold text-center text-blue-800">
                    All available jobs
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

export default AllJob;