import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterSpace() {
  const {
    selectedFilters,
    setSelectedFilters,
  } = useContext(AppContext);

  const handleRemoveFilters = (event) => {
    console.log(event.target);
    console.log(event.target.name);
    if (selectedFilters.length === 1) {
      setSelectedFilters([]);
    }
    const a = [...selectedFilters];
    // a.splice(event.target.name, 1);
    // a.filter((v) => (v.name !== event.target.name));
    console.log(a.filter((v) => (v.column !== event.target.name)));
    setSelectedFilters(a.filter((v) => (v.column !== event.target.name)));
    // setColumns();
    // console.log('a: ', a);
    // console.log('id : ', event.target.id);
  };

  return (
    <div className="filter_space">
      {
        selectedFilters.length !== 0
          && (selectedFilters.map((filtro) => (
            <section key={ filtro.column } className="filter_itens" data-testid="filter">
              <p>
                {filtro.column}
                {' '}
                {filtro.condition}
                {' '}
                {filtro.value}
              </p>
              <button
                type="button"
                // id={ filtro.column }
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
