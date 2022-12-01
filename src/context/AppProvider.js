import { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const { planets, isLoading, errors } = useFetch();
  const [newPlanets, setNewPlanets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columns, setColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [selected, setSelected] = useState({
    column: columns[0],
    condition: 'maior que',
    value: '0',
  });
  const [orderColumns, setOrderColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  useEffect(() => {
    setNewPlanets([...planets]);
  }, [planets]);

  useEffect(() => {
    setFiltered([...planets]);
  }, [isLoading]);

  useEffect(() => {
    setFiltered(filtered);
  }, [setInputFilter]);

  useEffect(() => {
    setColumnFilter(columnFilter);
  }, [selectedFilters]);

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
      selected,
      setSelected,
      selectedFilters,
      setSelectedFilters,
      columnFilter,
      setColumnFilter,
      comparisonFilter,
      setComparisonFilter,
      valueFilter,
      setValueFilter,
      columns,
      setColumns,
      order,
      setOrder,
      orderColumns,
      setOrderColumns,
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
      selected,
      setSelected,
      selectedFilters,
      setSelectedFilters,
      columnFilter,
      setColumnFilter,
      comparisonFilter,
      setComparisonFilter,
      valueFilter,
      setValueFilter,
      columns,
      setColumns,
      order,
      setOrder,
      orderColumns,
      setOrderColumns],
  );

  return <AppContext.Provider value={ value }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {}.isRequired;

export default AppProvider;
