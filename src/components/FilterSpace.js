import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterSpace() {
  const {
    newPlanets,
    setArrFilter,
    setFiltered,
    arrFilter } = useContext(AppContext);

  const handleRemoveFilters = (event) => {
    const arrAux = [...arrFilter];
    arrAux.slice(event.target.id);
    setArrFilter(arrAux);
    setFiltered(newPlanets);
  };

  return (
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
  );
}

export default FilterSpace;
