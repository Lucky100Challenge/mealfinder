'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'

interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

interface Ingredient {
  idIngredient: string
  strIngredient: string
}

interface CategoryListProps {
  onSelectCategory: (category: string) => void
  onSelectIngredient: (ingredient: string) => void
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, onSelectIngredient }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIngredient, setSelectedIngredient] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([
          axios.get('https://www.themealdb.com/api/json/v1/1/categories.php'),
          axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        ])
        setCategories(categoriesRes.data.categories)
        setIngredients(ingredientsRes.data.meals)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ingredient = e.target.value
    setSelectedIngredient(ingredient)
    if (ingredient) {
      onSelectIngredient(ingredient)
    }
  }

  if (loading) {
    return <div>Loading categories and ingredients...</div>
  }

  return (
    <div className="mb-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Explore Meal Categories</h2>
      <div className="mb-8 flex justify-center">
        <select
          value={selectedIngredient}
          onChange={handleIngredientChange}
          className="p-3 border-2 border-gray-300 rounded-full bg-white text-gray-800 shadow-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
        >
          <option value="">Select Ingredient</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.idIngredient} value={ingredient.strIngredient}>
              {ingredient.strIngredient}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.idCategory}
            className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => onSelectCategory(category.strCategory)}
          >
            <Image
              src={category.strCategoryThumb}
              alt={category.strCategory}
              width={200}
              height={200}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.strCategory}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{category.strCategoryDescription}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList