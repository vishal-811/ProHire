import axios from 'axios';
import { useState , useEffect } from 'react';

const AllJob=()=>{
        const [jobs, setJobs] = useState([]);
    
        useEffect(() => {
            axios.get('http://localhost:3000/api/v1/job/getall')
                .then((response) => {
                    if (response.status === 200) {
                        setJobs(response.data.allJobs);
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error("Failed to fetch jobs");
                });
        }, []);

    return(
        <div>
             <h2>All Available Jobs</h2>
        </div>
    )
}

export default AllJob;