import Apply from "../components/Apply"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import SearchComponent from "../components/SearchComponent"
import Footer from "../components/Footer"

const HomePage=()=>{
    return(
        <>
            <Navbar/>
             <Hero/>
             <SearchComponent/>
             <Apply/>
             <Footer/>
        </>
    )
}

export default HomePage;