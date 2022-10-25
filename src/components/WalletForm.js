import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { fetchCurrencies, addExpenses, addEditedExpenses } from '../redux/actions';
import './css/walletForm.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpense = async () => {
    const { id: outroId, value, description,
      currency, method, tag } = this.state;
    const { saveExpense } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    const newExpense = {
      id: outroId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates };
    this.setState(({ id }) => ({
      id: id > 0 ? id + 1 : 1,
    }));
    saveExpense(newExpense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer' });
  }

  editToExpense = () => {
    const { idToEdit, expenses, addEditedExpense } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    expenses.forEach((objExpense) => {
      if (objExpense.id === idToEdit) {
        objExpense.value = value;
        objExpense.description = description;
        objExpense.currency = currency;
        objExpense.method = method;
        objExpense.tag = tag;
      }
    });
    addEditedExpense(expenses);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Saúde' });
  }

  render() {
    const { currencies, error, editor } = this.props;
    const { value,
      description,
      currency: curr,
      method,
      tag } = this.state;
    return (
      <form className="wallet-form">
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            data-testid="value-input"
            name="value"
            placeholder="Valor"
            type="number"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            data-testid="description-input"
            name="description"
            placeholder="Descrição"
            type="text"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currencies">
          {!error ? 'Moeda:' : error }
          <select
            id="currencies"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ curr }
          >
            {currencies.map((currency) => (
              <option
                key={ currency }
              >
                { currency }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria:
          <select
            id="category"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        {editor
          ? (
            <button
              type="button"
              onClick={ this.editToExpense }
              className="btn btn-success btn-add-expense"
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="button"
              onClick={ this.addExpense }
              className="btn btn-success btn-add-expense"
            >
              Adicionar despesa
            </button>)}
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: propTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { currencies, error,
  idToEdit, editor, expenses } }) => ({
  currencies,
  error,
  idToEdit,
  editor,
  expenses });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(addExpenses(expense)),
  addEditedExpense: (editedExpenses) => dispatch(addEditedExpenses(editedExpenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
