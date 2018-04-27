import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import { selectHistory } from '../CalculatorControls/selectors';

const History = (props) => {
  const { history } = props;
  return (
    <View style={styles.historyWrapper}>
      <FlatList
        inverted
        data={history}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Text style={styles.historyItem}>{ item.key }</Text>}
      />
    </View>
  );
};

History.propTypes = {
  history: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  history: selectHistory,
});

const EnhancedHistory = connect(mapStateToProps)(History);
export default EnhancedHistory;
