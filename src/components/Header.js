import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import './css/header.css';
import myWallet from '../images/walletImg.png';

class Header extends Component {
  state = {
    email: '',
  }

  componentDidMount() {
    const email = localStorage.getItem('email');

    if (email) {
      this.setState({ email });
    }
  }

  render() {
    const { expenses } = this.props;
    const { email } = this.state;
    return (
      <header className="header-wallet">
        <div className="flexible-horizon div-title-header">
          <h4 className="title-header">MyWallet</h4>
          <img
            src={ myWallet }
            alt="My Wallet"
            className="my-wallet-image-Header"
          />
        </div>
        <div className="flexible-horizon div-info-header">
          <h4
            data-testid="email-field"
          >
            { email }
          </h4>
          <div className="flexible-horizon div-info-maney">
            <h4 data-testid="total-field">
              {expenses.reduce((acc, { exchangeRates, value, currency }) => acc
            + Number(exchangeRates[currency].ask) * value, 0).toFixed(2)}
            </h4>
            <h4 data-testid="header-currency-field">BRL</h4>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: propTypes.string,
  expenses: propTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
