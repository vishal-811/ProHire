import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const JobDetails=()=>{
       const [Jobs , setJobs] =useState("");
      const userRole =localStorage.getItem('role');
      const token =localStorage.getItem('token');
      console.log(userRole);

     const { id } =useParams();
      console.log(id);
     useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/job/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
              console.log(response.data.data);
             if(response.status ===200){
                  setJobs(response.data.data);
             }
        })
        .catch(error => {
            console.log(error);
            toast.error(error);
        })
    }, [id]); // Make sure to include jobId in the dependency array
    
    return(
        <div className="bg-slate-200 h-screen">
               <div className="p-8">
               <ul>
               <li>Title: {Jobs.title} </li>
               <li>category : {Jobs.category}</li>
               <li>Country :{Jobs.country}</li>
               <li>City : {Jobs.city}</li>
               <li>Pincode : {Jobs.pincode}</li>
               <li>Description :{Jobs.description}</li>
               <li>Postedon :{Jobs.jobpostedon}</li>
               <li>salary :{Jobs.fixedsalary}</li>
               </ul>
              {userRole==="Job seeker" ?  <button>Apply Now</button> :<></>}
               </div>
        </div>
    )
}

export default JobDetails;