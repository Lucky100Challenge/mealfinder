import dynamic from 'next/dynamic'
import SponsorSection from '../components/SponsorSection'
import type { SearchType } from '../types'

// Dynamically import Navbar as a Client Component to avoid Server Component issues
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false })

const Sponsors = () => {
  const handleSearch = async (query: string, type: SearchType) => {
    // Implement the search functionality here
    // For now, we'll just log the search parameters
    console.log('Search query:', query)
    console.log('Search type:', type)
    // You can replace this with actual search logic in the future
  }

  const handleRandomMeal = async () => {
    // Implement random meal functionality or navigation
    console.log('Random meal from Sponsors page')
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} onRandomMeal={handleRandomMeal} />
      <SponsorSection />
    </div>
  )
}

export default Sponsors