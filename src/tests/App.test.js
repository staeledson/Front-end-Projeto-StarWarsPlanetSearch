import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testa o arquivo App', () => {

  test('Testando se existe o ', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, App!/i);
  expect(linkElement).toBeInTheDocument();
});

})