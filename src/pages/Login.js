import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isBtnDisabled: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateInput);
  }

  validateInput = () => {
    const { email, senha } = this.state;
    const minCaractereSenha = 5;
    const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // https://regexr.com/3e48o
    const validateEmail = regexEmail.test(email);
    const validatePassword = senha.length > minCaractereSenha;
    const validation = validateEmail && validatePassword;
    this.setState({ isBtnDisabled: !validation });
  }

  handleBtn = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, emailDispatch } = this.props;
    emailDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, isBtnDisabled } = this.state;
    return (
      <form>
        <label htmlFor="input-login">
          Login
          <input
            type="text"
            data-testid="email-input"
            name="email"
            id="input-login"
            value={ email }
            placeholder="Digite seu login"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="input-senha">
          Password
          <input
            type="password"
            data-testid="password-input"
            name="senha"
            id="input-senha"
            value={ senha }
            placeholder="Digite sua senha"
            onChange={ this.handleInput }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleBtn }
          disabled={ isBtnDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (payload) => dispatch(actionEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape(Object).isRequired,
  emailDispatch: PropTypes.func.isRequired,
};
