import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionExpenses } from '../actions';
import handleSum from '../services/soma';
import getCurrency from '../services/currencyAPI';
import styles from '../pages/Wallet.module.css';

const initialTag = 'Alimentação';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: -1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: initialTag,
      exchangeRates: {},
    };
  }

  handleIputs = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  fetchApi = async () => {
    const api = await getCurrency();
    delete api.USDT;
    return api;
  }

  handleAddBtn = async (event) => {
    event.preventDefault();
    const { getExpenses, expenses } = this.props;

    this.setState((prevState) => ({ id: prevState.id + 1 }));
    this.setState({ exchangeRates: await this.fetchApi() });

    await getExpenses(this.state);

    handleSum(expenses);

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: initialTag,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form className={ styles.forms }>
        <label htmlFor="valor">
          Valor
          <input
            type="number"
            data-testid="value-input"
            className={ styles.input_value }
            id="valor"
            name="value"
            value={ value }
            onChange={ this.handleIputs }
          />
        </label>
        <label htmlFor="descrição">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            className={ styles.input_description }
            id="descrição"
            name="description"
            value={ description }
            onChange={ this.handleIputs }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleIputs }
          >
            { currencies.map((moeda) => (
              <option key={ moeda }>
                { moeda }
              </option>)) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleIputs }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select
            data-testid="tag-input"
            id="categoria"
            name="tag"
            value={ tag }
            onChange={ this.handleIputs }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleAddBtn }
          className={ styles.btn }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: (expenses) => dispatch(actionExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  getExpenses: PropTypes.func.isRequired,
};
