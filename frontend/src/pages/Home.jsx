import React from 'react'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Features from '../components/sections/Features'
import Contact from '../components/sections/Contact'
import About from '../components/sections/About'
import Footer from '../components/sections/Footer'

const Home = () => {
  return (
    <>
        <Hero />
        <Services />
        <Features />
        <Contact />
        <About />
        <Footer />
    </>
  )
}

export default Home