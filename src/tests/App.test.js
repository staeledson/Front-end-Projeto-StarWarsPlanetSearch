import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import planet from './testDataMock'
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { useMemo } from 'react';
import AppProvider from '../context/AppProvider';
import AppContext from '../context/AppContext';

const mockFunc = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(testData),
  }));
}

function renderUserApp() {
  return render(
    <AppProvider>
      <App />,
    </AppProvider>
  );
}

describe('Testa o arquivo App', () => {
  beforeEach(mockFunc);
  afterEach(cleanup);

  test('Testa os inputs da tread', async () => {
  renderUserApp();
     { planet };
    const projectName = screen.getByText(/Projeto Star Wars Trybe/i);
    expect(projectName).toBeInTheDocument();

    const nameFilter = await screen.findByTestId("name-filter");
    expect(nameFilter).toBeInTheDocument();

    const columnFilter = await screen.findByTestId("column-filter");
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = await screen.findByTestId("comparison-filter");
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = await screen.findByTestId("value-filter");
    expect(valueFilter).toBeInTheDocument();

    const buttonFilter = await screen.findByTestId("button-filter");
    expect(buttonFilter).toBeInTheDocument();

    const buttonRemoveFilters = await screen.findByTestId("button-remove-filters");
    expect(buttonRemoveFilters).toBeInTheDocument();
  });

  test('Testa options do filterSpace', async () => {
    renderUserApp();
    const options = await screen.findByTestId("column-filter");
    expect(options).toBeInTheDocument();
    const paramers = await screen.findByTestId("comparison-filter");
    expect(paramers).toBeInTheDocument();
    fireEvent.change(options, { target: { value: 'diameter' } });
    fireEvent.change(paramers, { target: { value: 'igual a' } } );
    const filterBtn = await screen.findByRole('button', { name: /filtrar/i });
    userEvent.click(filterBtn);
  });

});
