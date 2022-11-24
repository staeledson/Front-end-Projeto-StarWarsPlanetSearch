import { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const { planets, isLoading, errors } = useFetch();
  const [newPlanets, setNewPlanets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [cloumnFilter, setCloumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [arrFilter, setArrFilter] = useState([]);

  useEffect(() => {
    setNewPlanets([...planets]);
  }, [planets]);

  useEffect(() => {
    setFiltered([...planets]);
  }, [isLoading]);

  useEffect(() => {
    setFiltered(newPlanets);
  }, [inputFilter]);

  const value = useMemo(
    () => ({
      planets,
      isLoading,
      errors,
      newPlanets,
      setNewPlanets,
      filtered,
      setFiltered,
      inputFilter,
      setInputFilter,
      cloumnFilter,
      setCloumnFilter,
      comparisonFilter,
      setComparisonFilter,
      valueFilter,
      setValueFilter,
      arrFilter,
      setArrFilter,
    }),
    [planets,
      isLoading,
      errors,
      newPlanets,
      setNewPlanets,
      filtered,
      setFiltered,
      inputFilter,
      setInputFilter,
      cloumnFilter,
      setCloumnFilter,
      comparisonFilter,
      setComparisonFilter,
      valueFilter,
      setValueFilter,
      arrFilter,
      setArrFilter],
  );

  return <AppContext.Provider value={ value }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {}.isRequired;

export default AppProvider;
