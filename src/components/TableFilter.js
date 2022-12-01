import React, { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function TableFilter() {
  const { planets,
    isLoading,
    setFiltered,
    inputFilter,
    setInputFilter,
    setColumnFilter,
    setComparisonFilter,
    setValueFilter,
    selectedFilters,
    setSelectedFilters,
    selected,
    setSelected,
    columns,
    setColumns,
    order,
    setOrder,
    orderColumns,
  } = useContext(AppContext);

  useEffect(() => {
    setFiltered([...planets]);
  }, [isLoading]);

  // UseEffect para atualizar a renderização
  useEffect(() => {
  }, [inputFilter, selected, selectedFilters]);

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
    case 'column-sort':
      // setValueFilter(Number(event.target.value));
      setOrder({ ...order, column: Number(event.target.value) });
      break;
    default:
      break;
    }
  };
  // Função para salvar no array 'selectedFilters', os valores de input para um novo filtro
  const handleFilterButtonClick = () => {
    setColumns(columns.filter((c) => (selected.column !== c)));
    setSelectedFilters([...selectedFilters, selected]);
    setSelected({ ...selected, column: columns.find((c) => (selected.column !== c)) });
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
            value={ selected.column }
            onChange={ handleChange }
          >
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
            value={ selected.value }
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
          <div>
            <select
              className="filter_elements"
              data-testid="column-sort"
              name="column-sort"
              value={ order.column }
              onChange={ handleChange }
            >
              {orderColumns.map((c, index) => (
                (<option key={ index }>{c}</option>)
              ))}
            </select>
            <label htmlFor="orderDirection">
              <input
                type="radio"
                name="orderDirection"
                value="ASC"
                checked={ order.sort === 'ASC' }
                data-testid="column-sort-input-asc"
                onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
              />
              Crescente
            </label>
            <label htmlFor="orderDirection">
              <input
                type="radio"
                name="orderDirection"
                value="DESC"
                checked={ order.sort === 'DESC' }
                data-testid="column-sort-input-desc"
                onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
              />
              Decrescente
            </label>
            <button
              className="form_input_element"
              type="button"
              // onClick={ handleRemoveButtonClick }
              data-testid="column-sort-button"
            >
              Ordenar
            </button>
          </div>
        </section>
      </form>
    )
  );
}

export default TableFilter;
