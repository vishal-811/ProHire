import { BrowserRouter , Routes , Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import { ToastContainer , toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Hero from "./components/Hero"

function App() {
  

  return (
  <>
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<Hero/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path='/signin' element={<Signin/>}/>
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
