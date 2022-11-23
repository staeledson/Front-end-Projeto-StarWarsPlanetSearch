import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { planets, isLoading } = useFetch();
  const [filtered, setFiltered] = useState([]);

  const handleFilter = (value = '') => {
    const retorno = planets
      .filter((planet) => planet.name.toUpperCase().includes(value.toUpperCase()));
    setFiltered(retorno);
  };

  useEffect(() => {
    setFiltered(planets);
  }, [isLoading]);

  const handleChange = (event) => {
    handleFilter(event.target.value);
  };

  return (
    <div>
      <h1>tabela</h1>
      <input
        data-testid="name-filter"
        placeholder="pequisar"
        onChange={ handleChange }
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filtered && filtered.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((film) => (
                  <span key={ film }>{film}</span>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
