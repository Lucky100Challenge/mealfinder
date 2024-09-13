import Image from 'next/image'
import Link from 'next/link'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

const MealCard = ({ meal }: { meal: Meal }) => {
  return (
    <Link href={`/meal/${meal.idMeal}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
        <div className="relative h-64">
          <Image src={meal.strMealThumb} alt={meal.strMeal} layout="fill" objectFit="cover" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">{meal.strMeal}</h2>
          <p className="text-sm text-gray-600">Click to view recipe</p>
        </div>
      </div>
    </Link>
  )
}

export default MealCard