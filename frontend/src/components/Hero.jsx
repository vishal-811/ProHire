import Navbar from './Navbar'; 
import Herologo from '../assets/Herologo.jpg';

const Hero = () => {
    return (
        <>
            <Navbar />
            <div className="bg-black h-screen flex justify-between pt-24 select-none"> 
                {/* Left section */}
                <div className="w-1/2 text-white px-10">
                    <h2 className="text-7xl font-bold mb-8">Find Your Job <br />with ProHire!</h2>
                    <p className="text-xl mb-6 text-gray-200 leading-8">In this dynamic era of professional advancement, ProHire serves as your gateway to a world of opportunity. Discover a realm where ambitions flourish and aspirations find their true calling. With ProHire, embark on a journey where talent meets opportunity, where dreams transform into fulfilling careers.</p>
                    <p className='text-3xl font-semibold hover:text-green-500'>
                        Join us and unlock the door to your professional success.
                    </p>
                    <button className="mt-8 py-3 px-6 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-md shadow-md transition duration-300 ease-in-out flex items-center">
    Learn More
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M13.707 9.293a1 1 0 00-1.414-1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00.001-.001z" clipRule="evenodd" />
    </svg>
</button>

                </div>

                {/* Right section */}
                <div className='flex items-center w-1/2 mb-36 relative'>
                <img 
                 src={Herologo} 
                 alt="ProHire Logo" 
                className='rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-2/3 ms-48'
                style={{
                   transform: 'rotate(5deg)', // Apply a slight tilt effect
               }}
    />
     </div>
    
 </div>
        </>
    );
}

export default Hero;
