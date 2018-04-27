import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';


const CalculatorButton = (props) => {
  const { content, onPress, onLongPress, style, disabled } = props;
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{content}</Text>
    </TouchableOpacity>
  );
};

CalculatorButton.defaultProps = {
  disabled: false,
};

CalculatorButton.propTypes = {
  content: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default CalculatorButton;
