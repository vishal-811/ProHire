import { Link } from 'react-router-dom'

const  BottomWarning=({label ,buttonText , to })=>{
    return(
        <div className="py-2 text-md flex justify-center">
           <div>
              {label}
           </div>

           <Link className="pointer underline pl-1 cursor-pointer text-blue-700" to={to}>
               {buttonText}
           </Link>
        </div>
    )
}

export default BottomWarning;