import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterSpace() {
  const {
    selectedFilters,
    setSelectedFilters,
  } = useContext(AppContext);

  const handleRemoveFilters = (event) => {
    if (selectedFilters.length === 1) {
      setSelectedFilters([]);
    }
    const a = [...selectedFilters];
    setSelectedFilters(a.filter((v) => (v.column !== event.target.name)));
  };

  return (
    <div className="filter_space">
      {
        selectedFilters.length !== 0
          && (selectedFilters.map((filtro) => (
            <section key={ filtro.column } className="filter_itens" data-testid="filter">
              <p data-testid="filter-unit">
                {filtro.column}
                {' '}
                {filtro.condition}
                {' '}
                {filtro.value}
              </p>
              <button
                type="button"
                name={ filtro.column }
                onClick={ handleRemoveFilters }
              >
                X
              </button>
            </section>
          )))
      }
    </div>
  );
}

export default FilterSpace;
