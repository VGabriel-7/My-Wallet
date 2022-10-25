import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WalletForm from '../../components/WalletForm';
import state from './mockState';
import data from './mockData';

describe('Test WalletForm Page', () => {
  it('Testa se são renderizados todos os inputs necessários no componente <WalletForm />', () => {
    renderWithRouterAndRedux(<WalletForm />, { stateInitial: state });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();

  })
  it('Testa se ao clicar no botão Adicionar despesa a api é chamada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data),
    }));

    renderWithRouterAndRedux(<WalletForm />, { stateInitial: state });

    const addExpense = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.click(addExpense);

    expect(addExpense).toBeInTheDocument();
    expect(global.fetch).toBeCalledTimes(2)
  })
  // it('Testa se o botão Adicionar despesas reseta os valores dos inputs', () => {
  //   renderWithRouterAndRedux(<WalletForm />, { stateInitial: state });

  //   const value = screen.getByTestId('value-input');
  //   const description = screen.getByTestId('description-input');
  //   const currency = screen.getByTestId('currency-input');
  //   const method = screen.getByTestId('method-input');
  //   const tag = screen.getByTestId('tag-input');
  //   const addExpense = screen.getByRole('button', { name: /Adicionar despesa/i });

  //   userEvent.type(value)
  //   userEvent.type(description)
  //   userEvent.selectOptions(currency)
  //   userEvent.selectOptions(method)
  //   userEvent.selectOptions(tag)
  //   userEvent.click(addExpense);

  //   expect(value).toContainHTML('')
  //   expect(description).toContainHTML('')
  //   expect(currency).toContainHTML('')
  //   expect(method).toContainHTML('')
  //   expect(addExpense).toContainHTML('')
  // });
});