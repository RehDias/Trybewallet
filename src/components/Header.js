import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleSum from '../services/soma';
import styles from '../pages/Wallet.module.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    const total = handleSum(expenses);

    return (
      <header className={ styles.header }>
        <p data-testid="email-field">{ email }</p>
        <div className={ styles.total }>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};
