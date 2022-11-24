import { useEffect, useState } from 'react';
import requestAPI from '../services/api';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await requestAPI();
        setPlanets(data);
        setIsLoading(false);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return { isLoading, planets, errors };
}

export default useFetch;
