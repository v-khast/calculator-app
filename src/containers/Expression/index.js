import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { selectExpression, selectCurrentOperand } from '../CalculatorControls/selectors';

const Expression = (props) => {
  const { expression, currentOperand } = props;
  return (
    <Text numberOfLines={1} style={styles.question}>
      {`${expression.join(' ')} ${currentOperand}`}
    </Text>
  );
};

Expression.propTypes = {
  expression: PropTypes.array.isRequired,
  currentOperand: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  expression: selectExpression,
  currentOperand: selectCurrentOperand,
});

const EnhancedExpression = connect(mapStateToProps)(Expression);
export default EnhancedExpression;
