import HomeCard from "./HomeCard";
import Signuplogo from '../assets/Signuplogo.png'

const Apply=()=>{
    return (
        <div className="space-y-12">
               <p className="text-gray-400 text-3xl flex justify-center">How It Works?</p>
               <h3 className="flex justify-center text-5xl text-black font-semibold">Easy To Use, Easy To Apply</h3>
                <div className="flex justify-evenly">
                   <div className="space-y-5">
                      <HomeCard img={Signuplogo}/>
                      <p className="text-gray-400 text-xl">Step 1</p>
                      <p className="text-2xl text-black font-semibold">Sign Up For ProHire.</p>
                      <p className="text-xl text-gray-400">If you don't have an account yet.
                      <br/>The first step is to create an account.
                      <br/>Fill out the provision form in the form.</p>
                   </div> 

                   <div className="space-y-5">
                      <HomeCard/>
                      <p className="text-gray-400 text-xl">Step 2</p>
                      <p className="text-2xl text-black font-semibold">Find A Job To Your Liking.</p>
                      <p className="text-xl text-gray-400">Find the job you want.Then a number of 
                      <br/>jobs will appear that you want to find.Find <br/> one according to your abilities and desrires!</p>
                   </div>

                   <div className="space-y-5">
                     <HomeCard/>
                     <p className="text-gray-400 text-xl">Step 3</p>
                     <p className="text-2xl text-black font-semibold">Apply The Job Of Your Choice.</p>
                     <p className="text-xl text-gray-400">Fill out the form and submit a strong<br/> portfolio to be accepted at the company.
                     <br/>Wait for the results and make dreams come
                     <br/> true according to the expectations!</p>
                   </div>

                </div>
        </div>
    )
}

export default Apply;