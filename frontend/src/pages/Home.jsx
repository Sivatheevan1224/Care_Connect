import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Features from '../components/sections/Features'
import Doctors from '../components/sections/Doctors'
import HealthResources from '../components/sections/HealthResources'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

const Home = () => {
  return (
    <>
        <Hero />
        <Services />
        <Features />
        <Doctors />
        <HealthResources />
        <About />
        <Contact />
        <Footer />
    </>
  )
}

export default Home