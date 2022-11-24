import React, { useContext } from 'react';
import TableBody from './TableBody';
import TableTread from './TableTread';
import AppContext from '../context/AppContext';
import TableFilter from './TableFilter';

function Table() {
  const {
    isLoading,
  } = useContext(AppContext);

  return (
    <div>
      <h1>Projeto Star Wars Trybe</h1>
      {!isLoading && <TableFilter />}
      <table>
        <TableTread />
        {!isLoading && <TableBody />}
      </table>
    </div>
  );
}

export default Table;
