import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import { selectHistory } from '../CalculatorControls/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

class History extends Component {
  render() {
    const { history } = this.props;
    return (
      <View style={ styles.historyWrapper }>
        <FlatList
          inverted
          data={ history }
          keyExtractor={ (item, index) => index }
          renderItem={ ({ item }) => <Text style={ styles.historyItem }>{ item.key }</Text> }
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  history: selectHistory,
});

EnhancedHistory = connect(mapStateToProps)(History);
export default EnhancedHistory;
