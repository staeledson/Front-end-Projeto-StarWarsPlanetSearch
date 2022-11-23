import { useEffect, useState } from 'react';
import requestAPI from '../services/api';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState();
  const [errors, setErrors] = useState(null);
  const url = 'https://swapi.dev/api/planets';

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const data = await requestAPI();
        setPlanets(data);
        console.log(data);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (url) {
      fetchData();
    }
  }, []);
  return { isLoading, planets, errors };
}

export default useFetch;
