import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Features from '../components/sections/Features'
import HealthResources from '../components/sections/HealthResources'
import Contact from '../components/sections/Contact'
import About from '../components/sections/About'
import Footer from '../components/sections/Footer'

const Home = () => {
  return (
    <>
        <Hero />
        <About />
        <Services />
        <Features />
        <HealthResources />
        <Contact />
        <Footer />
    </>
  )
}

export default Home