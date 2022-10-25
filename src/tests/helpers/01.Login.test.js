import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../../pages/Login';
import App from '../../App';
import state from './mockState';

describe('Test Login Page', () => {
  it('Testa na rota / se é rederizado um formulário', () => {
    renderWithRouterAndRedux(<Login />);

    const form = screen.getByTestId('form-login')
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')

    expect(form).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  });

  it('Testa se ao clicar no botão Entrar a página <Wallet /> é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const login = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/Email/i);
    const inputPassword = screen.getByPlaceholderText(/Senha/i);

    userEvent.type(inputEmail, state.user.email);
    userEvent.type(inputPassword, '123456');
    userEvent.click(login);

    expect(history.location.pathname).toBe('/carteira')
  })
});
