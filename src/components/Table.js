import React, { useEffect, useState, useMemo, useContext } from 'react';
import TableBody from './TableBody';
import TableTread from './TableTread';
import AppContext from '../context/AppContext';

function Table() {
  const { planets, isLoading, newPlanets, setNewPlanets } = useContext(AppContext);
  const [filtered, setFiltered] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [cloumnFilter, setCloumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [arrFilter, setArrFilter] = useState([]);

  useEffect(() => {
    setFiltered([...planets]);
  }, [isLoading]);

  useEffect(() => {
    setFiltered(newPlanets);
  }, [inputFilter]);

  const memo = useMemo(
    () => ({
      cloumnFilter, comparisonFilter, valueFilter, arrFilter,
    }),
    [cloumnFilter, comparisonFilter, valueFilter, arrFilter],
  );

  const handleFilter = (targetValue) => {
    const copyPlanets = [...planets];
    const retorno = copyPlanets
      .filter((planet) => planet.name.toUpperCase().includes(targetValue.toUpperCase()));
    setNewPlanets(retorno);
  };

  const handleFilerOptions = (conteudo) => {
    const cf = cloumnFilter;
    switch (comparisonFilter) {
    case 'maior que':
      setFiltered(conteudo.filter((p) => (p[cf] > valueFilter)));
      break;
    case 'menor que':
      setFiltered(conteudo.filter((p) => (p[cf] < valueFilter)));
      break;
    case 'igual a':
      setFiltered(conteudo.filter((p) => (Number(p[cf]) === valueFilter)));
      break;
    default:
      setFiltered('conteudo');
      break;
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
    case 'name-filter':
      handleFilter(event.target.value);
      setInputFilter(event.target.value);
      break;

    case 'column-filter':
      setCloumnFilter(event.target.value);
      break;

    case 'comparison-filter':
      setComparisonFilter(event.target.value);
      break;

    case 'value-filter':
      setValueFilter(Number(event.target.value));
      break;

    default:
      break;
    }
  };
  const handleFilterButtonClick = () => {
    setArrFilter([...arrFilter, [cloumnFilter, comparisonFilter, valueFilter]]);
    handleFilerOptions(newPlanets);
    console.log(arrFilter);
  };

  const handleRemoveFilters = (event) => {
    const arrAux = [...arrFilter];
    arrAux.slice(event.target.id);
    setArrFilter(arrAux);
    setFiltered(newPlanets);
  };

  return (
    <div>
      <h1>Projeto Star Wars Trybe</h1>
      {!isLoading
      && (
        <div>

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
                onChange={ handleChange }
              >
                <option value="population">population</option>
                <option value="orbital_period">orbital_period</option>
                <option value="diameter">diameter</option>
                <option value="rotation_period">rotation_period</option>
                <option value="surface_water">surface_water</option>
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
                type="number"
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
                onChange={ handleChange }
                onClick={ handleRemoveFilters }
                data-testid="button-remove-filter"
              >
                Remover Filtros
              </button>
            </section>
            <div className="filter_space">
              {
                arrFilter !== []
                  ? (arrFilter.map((filtro, index) => (
                    <section key={ index } className="filter_itens">
                      <p>{filtro}</p>
                      <button
                        type="button"
                        id={ index }
                        onClick={ handleRemoveFilters }
                      >
                        X
                      </button>
                    </section>
                  )))
                  : (
                    <p>nada</p>
                  )
              }
            </div>
          </form>
        </div>
      )}
      <table>
        <TableTread />
        {!isLoading && <TableBody data={ filtered } />}
      </table>
    </div>
  );
}

export default Table;
