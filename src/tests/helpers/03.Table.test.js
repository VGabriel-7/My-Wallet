import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';

import Table from '../../components/Table';
import state from './mockState';
import userEvent from '@testing-library/user-event';

describe('Test Table Page', () => {
  it('Testa se a tabela é renderizada', () => {
    renderWithRouterAndRedux(<Table />, { initialState: state })
    
    const description = screen.getAllByRole('cell');

    expect(description[0]).toHaveTextContent('');
    expect(description[1]).toHaveTextContent('Alimentação');
    expect(description[2]).toHaveTextContent('Dinheiro');
    expect(description[3]).toHaveTextContent(0.00);
    expect(description[4]).toHaveTextContent('Dólar Americano/Real Brasileiro');
    expect(description[5]).toHaveTextContent(4.75);
    expect(description[6]).toHaveTextContent(4.75);
    expect(description[7]).toHaveTextContent('Real');
    expect(description[8]).toHaveTextContent('Excluir');
  })

  it('Testa se o botão excluir, exclui a despesa', () => {
    renderWithRouterAndRedux(<Table />, { initialState: state });

    const excluir = screen.getByRole('button', { name: /Excluir/i });
    const expense = screen.getByRole('cell', { name: /dinheiro/i })

    expect(expense).toBeInTheDocument();
    userEvent.click(excluir);
    expect(expense).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão editar, é renderizado um botão Editar despesa', () => {
    renderWithRouterAndRedux(<Table />, { initialState: state });
    
    const editar = screen.getByRole('button', { name: /Editar/i });
    userEvent.click(editar);
  })
})