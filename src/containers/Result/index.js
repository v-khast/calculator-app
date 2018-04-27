import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { selectCurrentOperand, selectExpression } from '../CalculatorControls/selectors';

const Result = (props) => {
  const { expression, currentOperand } = props;

  // add 'space' as thousand separator to a number
  const formatNumber = number => {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  return (
    <Text numberOfLines={1} style={styles.result} ellipsizeMode={'middle'} >
      { formatNumber(currentOperand) || (`${expression[expression.length - 1]} `) }
    </Text>
  );
};

Result.propTypes = {
  expression: PropTypes.array.isRequired,
  currentOperand: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expression: selectExpression,
  currentOperand: selectCurrentOperand,
});

const EnhancedResult = connect(mapStateToProps)(Result);
export default EnhancedResult;
