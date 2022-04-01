import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      expenses: 0,
      currencies: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { expenses, currencies } = this.state;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <div>
          <p data-testid="total-field">{ expenses }</p>
          <p data-testid="header-currency-field">{ currencies }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
