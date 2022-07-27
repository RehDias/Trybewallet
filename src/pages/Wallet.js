import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/table';
import { actionFectchCurrency } from '../actions';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getCurrency } = this.props;

    await getCurrency();
  }

  render() {
    return (
      <main className={ styles.main }>
        <Header />
        <Form />
        <Table />
      </main>
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
