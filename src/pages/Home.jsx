import { useEffect, useState } from 'react';

import { getAllCategories } from '../api';
import { Preloader } from '../components/Preloader';
import { CategoryList } from '../components/CategoryList';
import { useSearchParams } from 'react-router-dom';

import Search from '../components/Search';

export function Home() {
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const categoryQuery = searchParams.get('search') || '';

  const handleSearch = (str) => {
    setFilteredCatalog(catalog.filter((item) => item.strCategory.toLowerCase().includes(str.toLowerCase())));
    setSearchParams({ search: str });
  };

  useEffect(() => {
    getAllCategories().then((data) => {
      setCatalog(data.categories);
      setFilteredCatalog(
        searchParams
          ? data.categories.filter((item) => item.strCategory.toLowerCase().includes(categoryQuery))
          : data.categories
      );
    });
    // eslint-disable-next-line
  }, [searchParams]);
  return (
    <>
      <Search cb={handleSearch} />
      {!catalog.length ? <Preloader /> : <CategoryList catalog={filteredCatalog} />}
    </>
  );
}
