import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelete } from '../actions';
import styles from '../pages/Wallet.module.css';

class Table extends React.Component {
  handleDeleteBtn = async (event) => {
    event.preventDefault();
    const { value } = event.target;
    const { deleteBtn, expenses } = this.props;
    const deletedId = expenses.filter((expense) => Number(expense.id) !== Number(value));
    deleteBtn(deletedId);
  }

  render() {
    const { expenses } = this.props;

    return (
      <table className={ styles.table }>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const { value, exchangeRates, method, tag, description, id,
              currency } = expense;
            const currencyValue = exchangeRates[currency];

            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ currencyValue.name }</td>
                <td>{ Number(currencyValue.ask).toFixed(2) }</td>
                <td>{ (Number(currencyValue.ask) * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className={ styles.btn_edit }
                    value={ id }
                    onClick={ this.handleEditBtn }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={ styles.btn_remove }
                    data-testid="delete-btn"
                    value={ id }
                    onClick={ this.handleDeleteBtn }
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBtn: (payload) => dispatch(actionDelete(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteBtn: PropTypes.func.isRequired,
};
