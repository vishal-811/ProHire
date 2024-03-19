import LabelInputContainer from "../components/LabelInputContainer";
import Button from "../components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

  const PostJob = () => {
  const [title , setTitle] =useState('');
  const [description , setDescription] =useState("");
  const [category , setCategory] =useState('');
  const [country , setCountry] =useState("");
  const [city , setCity] =useState("");
  const [pincode , setPincode] =useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [submitting, setSubmitting] = useState(false);
//   const [islogin , setIslogin] =useState(false);
  const navigate =useNavigate();

  const token = localStorage.getItem('token');
  const role =localStorage.getItem('role');
  if(!token || !role || role!=='Employer'){
          toast.error("You cannot perform this action")
  }

  const handleSubmit = async() => {
    // e.preventDefault();
    setSubmitting(true); 
    
    if(salaryType==="Fixed Salary"){
        setSalaryFrom('');
        setSalaryTo('');
    }
    else if(salaryType ==="Ranged Salary"){
        setFixedSalary('');
    }
    else{
        setSalaryFrom('');
        setSalaryTo('');
        setFixedSalary('');
    }
        try {
            const response =await axios.post("http://localhost:3000/api/v1/job/post",
         fixedSalary.length>=4
    ?{
         title,
         description,
         category,
         country,
         city,
         pincode,
         fixedsalary:fixedSalary
    }:{
        title,
        description,
        category,
        country,
        city,
        pincode,
        salaryfrom:salaryFrom,
        salaryto:salaryTo
    },
    {
        headers:{
            authorization :'Bearer '+ token
        }
    })
       if(response.status === 201){
          toast.success(response.data.msg)
          navigate('/');
       }
        } catch (error) {
            setSubmitting(false);
            console.log(error);
            toast.error(error.response.data.msg) 
        }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-600 to-indigo-800">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Post a Job
        </h1>

        <LabelInputContainer label={"Title"} onchange={(e)=>{setTitle(e.target.value)}} />
        <LabelInputContainer label={"Description"} onchange={(e)=>{setDescription(e.target.value)}} />
        <LabelInputContainer label={"Category"} onchange={(e)=>{setCategory(e.target.value)}} />
        <LabelInputContainer label={"Country"} onchange={(e)=>{setCountry(e.target.value)}} />
        <LabelInputContainer label={"City"}  onchange={(e)=>{setCity(e.target.value)}}/>
        <LabelInputContainer label={"Pincode"}  onchnage={(e)=>{setPincode(e.target.value)}}/>

        <div className="salary_wrapper flex flex-col items-center space-y-4 bg-gray-100 rounded-lg p-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500 transition duration-300"
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
          >
            <option value="default">Select Salary Type</option>
            <option value="Fixed Salary">Fixed Salary</option>
            <option value="Ranged Salary">Ranged Salary</option>
          </select>

          {(salaryType === "Fixed Salary" || salaryType === "Ranged Salary") && (
            <div className="flex space-x-4">
              {salaryType === "Fixed Salary" ? (
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500 transition duration-300"
                  type="number"
                  placeholder="Enter Fixed Salary"
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                />
              ) : (
                <>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500 transition duration-300"
                    type="number"
                    placeholder="Salary From"
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-purple-500 transition duration-300"
                    type="number"
                    placeholder="Salary To"
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                  />
                </>
              )}
            </div>
          )}

          {salaryType === "default" && (
            <p className="text-red-500">Please provide Salary Type *</p>
          )}

          <Button
            label={submitting ? "Please wait..." : "Submit"}
            onclick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default PostJob;
