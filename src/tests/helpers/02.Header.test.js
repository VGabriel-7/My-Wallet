import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';

import Header from '../../components/Header';
import state from './mockState';

describe('Test Header Page', () => {
  it('Testa se o email digitado pelo usuário é renderizado no componente Header', () => {
    renderWithRouterAndRedux(<Header />, { initialState: state });

    const userEmail = screen.getByTestId('email-field');

    expect(userEmail).toHaveTextContent(/alguem@gmail.com/i)
  });
  it('Testa se a soma é renderizada no componente <Header />', () => {
    renderWithRouterAndRedux(<Header />, { initialState: state });

    const total = screen.getByTestId('total-field');

    expect(total).toHaveTextContent(4.75);
  });
  it('Testa se o BRL é renderizado no componente <Header />', () => {
    renderWithRouterAndRedux(<Header />);

    const brl = screen.getByTestId('header-currency-field');

    expect(brl).toHaveTextContent(/BRL/i)
  });
});