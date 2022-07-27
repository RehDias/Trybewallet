import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEmail } from '../actions';
import styles from './Login.module.css';

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
      <div className={ styles.container }>
        <form className={ styles.login }>
          <label htmlFor="input-login">
            Login
            { ' ' }
            { ' ' }
            <input
              type="text"
              data-testid="email-input"
              className={ styles.input_login }
              name="email"
              id="input-login"
              value={ email }
              placeholder="Digite seu email"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="input-senha">
            Password
            { ' ' }
            { ' ' }
            <input
              type="password"
              data-testid="password-input"
              className={ styles.input_senha }
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
            className={ styles.btn }
          >
            Entrar
          </button>
        </form>
      </div>
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
