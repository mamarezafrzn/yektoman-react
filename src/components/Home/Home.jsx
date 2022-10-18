import React from "react"
import CaseStudies from "../CaseStudies/CaseStudies"
import Cta from "../CTA/Cta"
import FeaturedSection from "../FeaturesSection/FeaturesSection"
import Footer from "../Footer/Footer"
import FunFacts from "../FunFacts/FunFacts"
import GoTotop from "../GoToTop/GoToTop"
import Header from "../Header/Header"
import MainBanner from "../MainBanner/MainBanner"
import News from "../News/News"
import PricingArea from "../PricingArea.jsx/PricingArea"
import Quote from "../Quote/Quote"
import Services from "../Services/Services"

 const Home = () =>{

    return(
<React.Fragment>
<Header/>
        <MainBanner/>
        <FeaturedSection/>
        <CaseStudies/>
        <Quote/>
        <Services/>
        <FunFacts/>
        <PricingArea/>
        <Cta/>
        <News/>
        <Footer/>
        <GoTotop/>
</React.Fragment>
    )
 }

 export default Home