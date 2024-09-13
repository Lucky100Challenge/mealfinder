import { useState, useEffect } from 'react'
import axios from 'axios'

interface PlannedMeal {
  id: string
  name: string
  day: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
}

interface ShoppingListProps {
  plannedMeals: PlannedMeal[]
}

interface Ingredient {
  ingredient: string
  measure: string
}

const ShoppingList: React.FC<ShoppingListProps> = ({ plannedMeals }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true)
      const ingredientsList: Ingredient[] = []
      for (const meal of plannedMeals) {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(meal.name)}`)
          const mealData = response.data.meals?.[0]
          if (mealData) {
            for (let i = 1; i <= 20; i++) {
              const ingredient = mealData[`strIngredient${i}`]
              const measure = mealData[`strMeasure${i}`]
              if (ingredient && ingredient.trim() !== '') {
                ingredientsList.push({ ingredient, measure })
              }
            }
          }
        } catch (error) {
          console.error('Error fetching ingredients:', error)
        }
      }
      setIngredients(ingredientsList)
      setLoading(false)
    }

    fetchIngredients()
  }, [plannedMeals])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shopping List</h2>
      {loading ? (
        <p>Loading ingredients...</p>
      ) : ingredients.length > 0 ? (
        <ul>
          {ingredients.map((item, index) => (
            <li key={index} className="mb-2">
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ingredients to display. Add meals to your plan to see the shopping list.</p>
      )}
    </div>
  )
}

export default ShoppingList