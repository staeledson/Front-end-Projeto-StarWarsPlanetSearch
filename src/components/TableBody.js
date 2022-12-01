import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function TableBody() {
  const { planets,
    selectedFilters, inputFilter, order } = useContext(AppContext);

  const handleFilter = () => {
    const copyPlanets = [...planets];
    // Filtrando com os valores do input
    const retornoFilterInput = copyPlanets
      .filter((planet) => planet.name.toUpperCase().includes(inputFilter.toUpperCase()));

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
    return filteredNameNConditions;
  };

  const ordenaDados = (a, b) => {
    const mn = -1;
    const { column, sort } = order;
    if (column !== 'CAPITAL') {
      if (sort === 'ASC') {
        return (a[column] - b[column]);
      } if (sort === 'DESC') {
        // console.log(a[column]);
        // console.log(b[column]);
        return (a[column] - b[column]) * mn;
      }
    }
    if (direction === 'ASC') {
      return (a[column] > b[column]) ? 1 : mn;
    } if (direction === 'DESC') {
      return (a[column] < b[column]) ? 1 : mn;
    }
  };

  return (
    <tbody>
      {handleFilter()?.sort(ordenaDados)
        .map((planet, index) => (
          <tr key={ index }>
            <td className="border">{planet.name}</td>
            <td className="border">{planet.rotation_period}</td>
            <td className="border">{planet.orbital_period}</td>
            <td className="border">{planet.diameter}</td>
            <td className="border">{planet.climate}</td>
            <td className="border">{planet.gravity}</td>
            <td className="border">{planet.terrain}</td>
            <td className="border">{planet.surface_water}</td>
            <td className="border">{planet.population}</td>
            <td className="border">
              {planet.films.map((film) => (
                <span key={ film }>{film}</span>
              ))}
            </td>
            <td className="border">{planet.created}</td>
            <td className="border">{planet.edited}</td>
            <td className="border">{planet.url}</td>
          </tr>
        ))}
    </tbody>
  );
}
