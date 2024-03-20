import axios from 'axios';


const AllJob=()=>{
             axios.get('http://localhost:3000/api/v1/job/getall',{
        }).then((response)=>{
           if(response.status===200){
            console.log(response.data.allJobs);
           }
        }).catch(error =>{
            console.log(error);
        })

    return(
        <div>
             <h2>All Available Jobs</h2>
        </div>
    )
}

export default AllJob;