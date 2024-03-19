import Searchlogo from '../assets/Searchlogo.png'

const SearchComponent =()=>{
    return(
      <> 
         
        <div className='bg-white mt-36 flex justify-between'>
        {/* Left part */}
               <div className="w-1/2  rounded h-3/4 mb-12">
                       <img className='w-full ms-16 h-4/5 rounded-lg' src={Searchlogo}/>
               </div>

             {/* Right part */}
               <div className=' ms-44 w-1/2 space-y-12 mt-8'>
                   <p className='text-6xl text-black font-semibold '>Search And Apply
                   <br></br>
                   The Job You Want.</p>

                   <p className='text-2xl text-gray-400'>Find a job according to your skills.We will make it <br/> easy to make your dreams come true.Come find a <br/> 
                   job in <span className='text-4xl text-blue-600 font-semibold'>ProHire </span></p>

                   <div className='flex justify-between mt-36'>
                       <ul className='space-y-3'>
                            <li className='text-gray-400 text-xl'>Users</li>
                            <li className='text-4xl font-semibold'>100K+ Users</li>
                       </ul>

                       <ul className='me-36 space-y-3'>
                            <li className='text-gray-400 text-xl'>Job Vacancy</li>
                            <li className='text-4xl font-semibold'>15k+ Jobs</li>
                       </ul>
                 </div>
               </div>
                 
                 
        </div>
        </>
    )
}

export default SearchComponent