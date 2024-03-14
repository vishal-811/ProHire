
const  LabelInputContainer=({label , placeholder , onchange})=>{
    return(
        <div>
             <div>
                {label}
             </div>
             <input placeholder={placeholder}/>
        </div>
    )
}

export default LabelInputContainer;