'use client'

import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import MealCard from '../components/MealCard'
import CategoryList from '../components/CategoryList'
import type { SearchType } from '../types'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [showingMeals, setShowingMeals] = useState(false)

  const searchMeals = async (query: string, type: SearchType) => {
    if (!query) return
    setLoading(true)
    try {
      let res
      switch (type) {
        case 'name':
          res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
          break
        case 'ingredient':
          res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
          break
        case 'area':
          res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`)
          break
        default:
          throw new Error('Invalid search type')
      }
      setMeals(res.data.meals || [])
      setShowingMeals(true)
    } catch (error) {
      console.error(error)
      setMeals([])
    }
    setLoading(false)
  }

  const getRandomMeal = async () => {
    setLoading(true)
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      setMeals([res.data.meals[0]])
      setShowingMeals(true)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const fetchMealsByCategory = async (category: string) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      setMeals(res.data.meals || [])
      setShowingMeals(true)
    } catch (error) {
      console.error('Error fetching meals by category:', error)
    }
    setLoading(false)
  }

  const fetchMealsByIngredient = async (ingredient: string) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      setMeals(res.data.meals || [])
      setShowingMeals(true)
    } catch (error) {
      console.error('Error fetching meals by ingredient:', error)
    }
    setLoading(false)
  }

  const handleBackToCategories = () => {
    setShowingMeals(false)
    setMeals([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <Navbar onSearch={searchMeals} onRandomMeal={getRandomMeal} />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center animate-fade-in-down">
          Discover Delicious Recipes
        </h1>
        {showingMeals ? (
          <>
            <button
              onClick={handleBackToCategories}
              className="mb-8 px-6 py-3 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
            >
              ← Back to Categories
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          </>
        ) : (
          <CategoryList 
            onSelectCategory={fetchMealsByCategory} 
            onSelectIngredient={fetchMealsByIngredient}
          />
        )}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home