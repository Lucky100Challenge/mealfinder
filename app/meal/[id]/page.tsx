'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import { SearchType } from '../../../types'
import axios from 'axios'

interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string | null
  [key: string]: any
}

interface MealPageProps {
  params: {
    id: string
  }
}

const MealPage = ({ params }: MealPageProps) => {
  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeal = async () => {
      if (params.id) {
        try {
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
          setMeal(res.data.meals?.[0] || null)
        } catch (error) {
          console.error('Failed to fetch meal:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchMeal()
  }, [params.id])

  const handleSearch = async (query: string, type: SearchType) => {
    console.log('Search from meal page:', query, type)
    // Implement search functionality or navigation
  }

  const handleRandomMeal = async () => {
    // Implement random meal functionality
    console.log('Random meal from meal page')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!meal) {
    return <div>Meal not found</div>
  }

  const ingredients = Object.keys(meal)
    .filter(key => key.startsWith('strIngredient') && meal[key])
    .map(key => ({
      ingredient: meal[key],
      measure: meal[`strMeasure${key.slice(13)}`]
    }))

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={handleSearch} onRandomMeal={handleRandomMeal} />
      <main className="container mx-auto py-8 px-4">
        <Link href="/" className="inline-block mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors shadow-soft">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{meal.strMeal}</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-soft">
            <Image src={meal.strMealThumb} alt={meal.strMeal} width={500} height={500} layout="responsive" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <p className="text-lg mb-4"><strong>Category:</strong> {meal.strCategory}</p>
            <p className="text-lg mb-4"><strong>Area:</strong> {meal.strArea}</p>
            {meal.strTags && (
              <p className="text-lg mb-4"><strong>Tags:</strong> {meal.strTags.split(',').join(', ')}</p>
            )}
            <h2 className="text-2xl font-semibold mt-6 mb-4">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {ingredients.map((item, index) => (
                <li key={index}>{item.measure} {item.ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-soft">
          <h2 className="text-2xl font-semibold mb-4">Instructions:</h2>
          <p className="text-lg whitespace-pre-line">{meal.strInstructions}</p>
        </div>
        {meal.strYoutube && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Video Tutorial:</h2>
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Watch on YouTube
            </a>
          </div>
        )}
      </main>
    </div>
  )
}

export default MealPage