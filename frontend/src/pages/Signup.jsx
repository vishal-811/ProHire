import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import LabelInputContainer from "../components/LabelInputContainer";
import Subheading from "../components/Subheading";

const Signup=()=>{
     return(
       <div className="flex justify-center">
           <div>
                <Heading label={"Sign Up"}/>
                <Subheading label={"Enter your information to create an account"}/>
                <LabelInputContainer label={"Username"} placeholder={"Enter your username"} />
                <LabelInputContainer label={"Email"} placeholder={"Enter your Email"}/>
                <LabelInputContainer label={"password"} placeholder={"Enter your password"}/>
                <Button label={"Sign up"} />
                <BottomWarning label={"Already have an account?  "} buttonText={"Sign in"} />
           </div>
       </div>
     )
}

export default Signup;