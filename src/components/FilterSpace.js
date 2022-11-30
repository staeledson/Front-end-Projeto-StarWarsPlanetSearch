import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterSpace() {
  const {
    selectedFilters,
    setSelectedFilters } = useContext(AppContext);

  const handleRemoveFilters = (event) => {
    if (selectedFilters.length === 1) {
      setSelectedFilters([]);
    }
    const a = [...selectedFilters];
    console.log('a: ', a);
    console.log('id : ', event.target.id);
    setSelectedFilters(a.splice(event.target.id, 1));
  };

  return (
    <div className="filter_space">
      {
        selectedFilters.length !== 0
          && (selectedFilters.map((filtro, index) => (
            <section key={ index } className="filter_itens">
              <p>
                {filtro.column}
                {' '}
                {filtro.condition}
                {' '}
                {filtro.value}
              </p>
              <button
                type="button"
                id={ index }
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
