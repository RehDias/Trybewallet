import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import { actionFectchCurrency } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  render() {
    return (
      <>
        <Header />
        <Form />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(actionFectchCurrency()),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getCurrency: PropTypes.func.isRequired,
};
