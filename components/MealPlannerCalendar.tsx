import { useState } from 'react'

interface PlannedMeal {
  id: string
  name: string
  day: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
}

interface MealPlannerCalendarProps {
  plannedMeals: PlannedMeal[]
  addMealToPlan: (meal: PlannedMeal) => void
  removeMealFromPlan: (mealId: string) => void
  clearMealPlan: () => void
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['breakfast', 'lunch', 'dinner'] as const

const mealTypeColors = {
  breakfast: 'bg-blue-100 text-blue-800',
  lunch: 'bg-green-100 text-green-800',
  dinner: 'bg-purple-100 text-purple-800',
}

const MealPlannerCalendar: React.FC<MealPlannerCalendarProps> = ({ 
  plannedMeals, 
  addMealToPlan, 
  removeMealFromPlan,
  clearMealPlan
}) => {
  const [newMeal, setNewMeal] = useState<Omit<PlannedMeal, 'id'>>({ name: '', day: '', mealType: 'breakfast' })

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMeal.name && newMeal.day && newMeal.mealType) {
      addMealToPlan({ ...newMeal, id: Date.now().toString() })
      setNewMeal({ name: '', day: '', mealType: 'breakfast' })
    }
  }

  const handleClearPlan = () => {
    if (window.confirm('Are you sure you want to clear the entire meal plan?')) {
      clearMealPlan()
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Weekly Meal Plan</h2>
      <form onSubmit={handleAddMeal} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Meal name"
          value={newMeal.name}
          onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex space-x-4">
          <select
            value={newMeal.day}
            onChange={(e) => setNewMeal({ ...newMeal, day: e.target.value })}
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select day</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select
            value={newMeal.mealType}
            onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value as PlannedMeal['mealType'] })}
            className="w-1/2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {mealTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300">
          Add Meal
        </button>
      </form>
      <div className="grid grid-cols-7 gap-4 mb-6">
        {days.map(day => (
          <div key={day} className="text-center font-semibold text-gray-700">{day.slice(0, 3)}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {days.map(day => (
          <div key={day} className="border border-gray-200 rounded-lg p-2 h-40 overflow-y-auto">
            {mealTypes.map(type => (
              <div key={type} className="mb-2">
                {plannedMeals
                  .filter(meal => meal.day === day && meal.mealType === type)
                  .map(meal => (
                    <div key={meal.id} className={`${mealTypeColors[meal.mealType]} rounded-md p-1 mb-1 text-sm flex justify-between items-center`}>
                      <span className="truncate">{meal.name}</span>
                      <button 
                        onClick={() => removeMealFromPlan(meal.id)}
                        className="text-gray-600 hover:text-red-500 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        ))}
      </div>
      <button 
        onClick={handleClearPlan}
        className="mt-6 w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-300"
      >
        Clear Entire Plan
      </button>
    </div>
  )
}

export default MealPlannerCalendar