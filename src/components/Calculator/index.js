import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import History from '../../containers/History';
import Expression from '../../containers/Expression';
import Result from '../../containers/Result';
import CalculatorControls from '../../containers/CalculatorControls';
import styles from './styles';

class Calculator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <History />
        <Expression />
        <Result />
        <CalculatorControls />
      </View>
    );
  }
}

export default Calculator;
