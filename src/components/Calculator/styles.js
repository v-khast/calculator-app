import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 24,
        backgroundColor: '#2c434a'
    },
});

export default styles;
