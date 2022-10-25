import React from 'react';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import './css/wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    document.title = 'Wallet';
  }

  render() {
    return (
      <section className="main-wallet">
        <Header />
        <div className="div-wallet-components">
          <WalletForm />
          <Table />
        </div>
      </section>
    );
  }
}

export default Wallet;
