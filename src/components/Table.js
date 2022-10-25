/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpenses, editExpenses } from '../redux/actions';
import './css/table.css';

import trash from '../images/trash-2.svg';
import edit from '../images/edit.svg';

class Table extends Component {
  deleteExpense = (idDeleted) => {
    const { deleteExpense } = this.props;
    deleteExpense(idDeleted);
  }

  editExpense = (idEdited) => {
    const { editExpense } = this.props;
    editExpense(idEdited);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table main-table">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {expenses.map(({
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates,
        }) => {
          const exchangeRate = Number(exchangeRates[currency].ask);
          return (
            <tbody key={ id }>
              <tr>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ exchangeRate.toFixed(2) }</td>
                <td>{ (exchangeRate * value).toFixed(2) }</td>
                <td>Real</td>
                <td className="td-buttons">
                  <div className="div-buttons-table">
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(id) }
                      className="btn btn-danger"
                    >
                      <img src={ trash } alt="" />
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editExpense(id) }
                      className="btn btn-warning"
                    >
                      <img src={ edit } alt="" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (idDeleted) => dispatch(deleteExpenses(idDeleted)),
  editExpense: (idEdited) => dispatch(editExpenses(idEdited)),
});

Table.propTypes = {
  expenses: propTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
