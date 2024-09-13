'use client'

import Navbar from '../../components/Navbar'
import AboutSection from '../../components/AboutSection'
import type { SearchType } from '../../types'

const About = () => {
  const handleSearch = async (query: string, type: SearchType) => {
    // Implement search functionality if needed on the About page
    console.log('Search from About page:', query, type)
  }

  const handleRandomMeal = async () => {
    // Implement random meal functionality or navigation
    console.log('Random meal from About page')
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} onRandomMeal={handleRandomMeal} />
      <div className="container mx-auto p-8">
        <AboutSection />
      </div>
    </div>
  )
}

export default About