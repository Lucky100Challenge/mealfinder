'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SearchType } from '../types'

interface NavbarProps {
  onSearch: (query: string, type: SearchType) => Promise<void>
  onRandomMeal: () => Promise<void>
}

const Navbar = ({ onSearch, onRandomMeal }: NavbarProps) => {
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('name')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSearch(search, searchType)
    setIsMobileMenuOpen(false)
  }

  const handleRandomMeal = async () => {
    await onRandomMeal()
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
            🍽️ Recipe Planner
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
            <Link href="/meal-planner" className="text-gray-600 hover:text-primary transition-colors">Meal Planner</Link>
            <Link href="/sponsors" className="text-gray-600 hover:text-primary transition-colors">Sponsors</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <Link href="/" className="block py-2 text-gray-600 hover:text-primary transition">Home</Link>
            <Link href="/about" className="block py-2 text-gray-600 hover:text-primary transition">About</Link>
            <Link href="/sponsors" className="block py-2 text-gray-600 hover:text-primary transition">Sponsors</Link>
          </div>
        )}
        <form onSubmit={handleSubmit} className="py-4 flex items-center">
          <div className="flex flex-1 shadow-soft rounded-md overflow-hidden">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as SearchType)}
              className="px-4 py-2 bg-white border-none text-gray-800 focus:ring-2 focus:ring-primary"
            >
              <option value="name">Name</option>
              <option value="ingredient">Ingredient</option>
              <option value="area">Area</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 bg-white border-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="px-6 py-2 bg-primary text-white hover:bg-primary-dark transition-colors">
              Search
            </button>
          </div>
          <button 
            type="button" 
            onClick={handleRandomMeal} 
            className="ml-4 px-6 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-colors shadow-soft"
          >
            Random Meal
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar