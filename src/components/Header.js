import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleSum from '../services/soma';

class Header extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     expenses: 0,
  //   };
  // }

  render() {
    const { email, expenses } = this.props;
    // const { expenses } = this.props;
    // console.log(expenses);

    const total = handleSum(expenses);
    console.log(total);
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <div>
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
