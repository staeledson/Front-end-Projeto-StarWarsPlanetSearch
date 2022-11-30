import React, { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function TableFilter() {
  const { planets,
    isLoading,
    setFiltered,
    inputFilter,
    setInputFilter,
    columnFilter,
    setColumnFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    selectedFilters,
    setSelectedFilters,
    selected,
    setSelected,
    columns,
    setColumns,
  } = useContext(AppContext);

  useEffect(() => {
    setFiltered([...planets]);
  }, [isLoading]);

  const handleFilter = (v) => {
    const copyPlanets = [...planets];
    // Filtrando com os valores do input
    const retornoFilterInput = copyPlanets
      .filter((planet) => planet.name.toUpperCase().includes(v.toUpperCase()));

    // Retornando um array já com os valores de filtros aplicados
    const filteredNameNConditions = retornoFilterInput.filter((planet) => {
      const filterResults = selectedFilters.map(({ column, condition, value }) => {
        switch (condition) {
        case 'maior que':
          return Number(planet[column]) > Number(value);
        case 'menor que':
          return Number(planet[column]) < Number(value);
        case 'igual a':
          return Number(planet[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterResults.every((el) => el);
    });
    // return filteredNameNConditions;
    // Salvando no estado 'filtered', o retorno dos filtros
    setFiltered(filteredNameNConditions);
  };

  // UseEffect para atualizar a renderização
  useEffect(() => {
    handleFilter(inputFilter);
  }, [inputFilter, selectedFilters]);

  // Função para lidar com as alterações nos filtros e inputs
  const handleChange = (event) => {
    switch (event.target.name) {
    case 'name-filter':
      setInputFilter(event.target.value);
      break;

    case 'column-filter':
      setColumnFilter(event.target.value);
      setSelected({ ...selected, column: event.target.value });
      break;

    case 'comparison-filter':
      setComparisonFilter(event.target.value);
      setSelected({ ...selected, condition: event.target.value });
      break;

    case 'value-filter':
      setValueFilter(Number(event.target.value));
      setSelected({ ...selected, value: Number(event.target.value) });
      break;

    default:
      break;
    }
  };
  // Função para salvar no array 'selectedFilters', os valores de input para um novo filtro
  const handleFilterButtonClick = () => {
    setColumnFilter(columns.find((c) => (selected.column !== c)));
    setColumns(columns.filter((c) => (selected.column !== c)));
    setSelectedFilters([...selectedFilters, selected]);
  };

  // Função para remover filtros do array 'selectedFilters'
  const handleRemoveButtonClick = () => {
    setSelectedFilters([]);
  };

  return (
    (
      <form className="form_filter">
        <input
          className="filter_elements"
          data-testid="name-filter"
          name="name-filter"
          placeholder="pequisar"
          onChange={ handleChange }
        />
        <section>

          <select
            className="filter_elements"
            data-testid="column-filter"
            name="column-filter"
            value={ columnFilter }
            onChange={ handleChange }
          >
            {/* {columns.map((c, index) => (
              (!selectedFilters.some((s) => s.column === c))
              && (<option key={ index }>{c}</option>)
            ))} */}
            {columns.map((c, index) => (
              (<option key={ index }>{c}</option>)
            ))}

          </select>
          <select
            className="filter_elements"
            data-testid="comparison-filter"
            name="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="text"
            className="form_input_element"
            data-testid="value-filter"
            name="value-filter"
            value={ valueFilter }
            onChange={ handleChange }
          />
          <button
            className="form_input_element"
            type="button"
            onChange={ handleChange }
            onClick={ handleFilterButtonClick }
            data-testid="button-filter"
          >
            Filtrar
          </button>
          <button
            className="form_input_element"
            type="button"
            onClick={ handleRemoveButtonClick }
            data-testid="button-remove-filters"
          >
            Remover
          </button>

        </section>
      </form>
    )
  );
}

export default TableFilter;
