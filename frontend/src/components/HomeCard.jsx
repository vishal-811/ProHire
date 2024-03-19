

const HomeCard=({img})=>{
    return(
        <div className="border-2 solid border-gray-300 bg-gray-100 w-80 h-80 rounded-lg relative overflow-hidden flex justify-center items-center hover:5">
           <img src={img} className='w-full rounded-lg flex  transform scale-180 hover:scale-90 transition duration-300 ease' alt="HomeCard Image"/>
       </div>


    )
}

export default HomeCard;