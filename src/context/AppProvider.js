import { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const { planets, isLoading, errors } = useFetch();
  const [newPlanets, setNewPlanets] = useState([]);
  useEffect(() => {
    setNewPlanets([...planets]);
  }, [planets]);

  const value = useMemo(
    () => ({
      planets,
      isLoading,
      errors,
      newPlanets,
      setNewPlanets,
    }),
    [planets, isLoading, setNewPlanets, newPlanets],
  );

  return <AppContext.Provider value={ value }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {}.isRequired;

export default AppProvider;
