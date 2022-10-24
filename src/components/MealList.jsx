import { Meal } from './Meal';

export function MealList({ meals }) {
  return (
    <div className="list">
      {meals.map((el) => (
        <Meal key={el.idMeal} {...el} />
      ))}
    </div>
  );
}
