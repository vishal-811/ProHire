import { BrowserRouter , Routes , Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { ToastContainer , toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import NotFound from './components/NotFound'
import PostJob from "./pages/PostJob";
import EmployerJob from "./pages/EmployerJob";
import JobCard from "./components/JobCard";

function App() {
  return (
  <>
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<HomePage/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path='/signin' element={<Signin/>}/>
         <Route path='/postjob' element={<PostJob/>}/>
         <Route path="/myposts" element={<EmployerJob/>}/>
         <Route path='/card' element={<JobCard/>}/>
         <Route path="/*" element={<NotFound/>}/>
     </Routes>   
   </BrowserRouter>
   <ToastContainer
position="top-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition: Bounce
/>

  </>
  )
}

export default App
