import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      moeda: '',
      method: '',
      tag: '',
    };
  }

  handleIputs = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, description, moeda, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            type="number"
            data-testid="value-input"
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
            name="moeda"
            onChange={ this.handleIputs }
            value={ moeda }
          >
            { currencies.map((currency) => (
              <option key={ currency }>{ currency }</option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ this.handleIputs }
          >
            <option value={ method }>Dinheiro</option>
            <option value={ method }>Cartão de crédito</option>
            <option value={ method }>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select
            data-testid="tag-input"
            id="categoria"
            name="tag"
            onChange={ this.handleIputs }
          >
            <option value={ tag }>Alimentação</option>
            <option value={ tag }>Lazer</option>
            <option value={ tag }>Trabalho</option>
            <option value={ tag }>Transporte</option>
            <option value={ tag }>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(Object).isRequired,
};
