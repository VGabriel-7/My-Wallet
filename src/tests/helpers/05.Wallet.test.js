import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Wallet from '../../pages/Wallet';

describe('', () => {
  it('', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />);

    expect(history.location.pathname).toBe('/')
  });
});