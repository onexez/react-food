import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getFilteredCategories } from '../api';
import { Preloader } from '../components/Preloader';
import { MealList } from '../components/MealList';

export function Category() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    getFilteredCategories(name).then((data) => setMeals(data.meals));
  }, [name]);
  return (
    <>
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
      {!meals.length ? <Preloader /> : <MealList meals={meals} />}
    </>
  );
}
