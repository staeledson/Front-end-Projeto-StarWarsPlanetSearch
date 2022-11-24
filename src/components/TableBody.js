import React from 'react';

export default function TableBody(d) {
  const { data } = d;
  return (
    <tbody>
      {data && data.map((planet, index) => (
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
