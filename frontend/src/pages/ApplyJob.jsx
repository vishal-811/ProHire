import { useState } from "react";
import Heading from "../components/Heading";
import LabelInputContainer from "../components/LabelInputContainer";
import axios from "axios";
import { useParams , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [coverletter, setCoverletter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false); // State variable for loading
  const token = localStorage.getItem("token");
  const { id } = useParams();

   const navigate =useNavigate();
  const handleFileChange = (event) => {
    const resumeFile = event.target.files[0];
    setResume(resumeFile); // Set the file object itself
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading to true when form is being submitted

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('coverletter', coverletter);
    formData.append('resume', resume);
    formData.append('jobId', id);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/application/post", formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false); // Set loading to false when request is completed
      if(response.status===200){
            navigate('/');
           toast.success(response.data.msg);
      }
    } catch (error) {
      setLoading(false); // Set loading to false when request is completed
      console.error(error);
      toast.error(error.response.data.msg)
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Heading label={"Application Form"} />
        <form onSubmit={handleSubmit}> {/* Wrap your input fields in a form */}
          <div className="mt-6">
            <LabelInputContainer onchange={(e) => { setUsername(e.target.value) }} label={"Username"} placeholder={"Enter your Username"} />
            <LabelInputContainer onchange={(e) => { setEmail(e.target.value) }} label={"Email"} placeholder={"Enter your Email"} />
            <textarea
              onChange={(e) => { setCoverletter(e.target.value) }}
              className="w-full mt-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              rows="4"
              placeholder="Cover Letter..."
            />
            <div className="mt-4">
              <label className="block text-lg">Select Resume</label>
              <input
                onChange={handleFileChange}
                name="resume"
                type="file"
                accept=".pdf, .jpg, .png"
                className="w-full mt-1 py-2 px-3 border rounded-md focus:outline-none focus:border-blue-400"
              />
            </div>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Sending Application...' : 'Send Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
