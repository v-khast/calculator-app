import React from 'react';
import { StyleSheet, View } from 'react-native';
import Calculator from "./src/components/Calculator"
import reducer from './reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'


const store = createStore(
    reducer
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Calculator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
