'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '../../components/Navbar'
import ShoppingList from '../../components/ShoppingList'
import { SearchType } from '../../types'

// Dynamically import MealPlannerCalendar with ssr disabled
const MealPlannerCalendar = dynamic(() => import('../../components/MealPlannerCalendar'), { ssr: false })

interface PlannedMeal {
  id: string
  name: string
  day: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
}

const MealPlanner = () => {
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Load planned meals from localStorage when the component mounts
    const savedMeals = localStorage.getItem('plannedMeals')
    if (savedMeals) {
      setPlannedMeals(JSON.parse(savedMeals))
    }
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Save planned meals to localStorage whenever it changes
    if (isClient) {
      localStorage.setItem('plannedMeals', JSON.stringify(plannedMeals))
    }
  }, [plannedMeals, isClient])

  const handleSearch = async (query: string, type: SearchType) => {
    console.log('Search from meal planner:', query, type)
    // Implement search functionality
  }

  const handleRandomMeal = async () => {
    console.log('Random meal from meal planner')
    // Implement random meal functionality
  }

  const addMealToPlan = (meal: PlannedMeal) => {
    setPlannedMeals(prevMeals => [...prevMeals, meal])
  }

  const removeMealFromPlan = (mealId: string) => {
    setPlannedMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId))
  }

  const clearMealPlan = () => {
    setPlannedMeals([])
    localStorage.removeItem('plannedMeals')
    localStorage.removeItem('shoppingList')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <Navbar onSearch={handleSearch} onRandomMeal={handleRandomMeal} />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-12 text-center animate-fade-in-down">
          Meal Planner
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {isClient && (
            <MealPlannerCalendar 
              plannedMeals={plannedMeals} 
              addMealToPlan={addMealToPlan}
              removeMealFromPlan={removeMealFromPlan}
              clearMealPlan={clearMealPlan}
            />
          )}
          <ShoppingList plannedMeals={plannedMeals} />
        </div>
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handlePrint}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Print Meal Plan
          </button>
        </div>
      </main>
    </div>
  )
}

export default MealPlanner