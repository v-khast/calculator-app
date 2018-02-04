import React, {Component} from "react";
import {Text} from "react-native";
import styles from "./styles";
import {selectCurrentOperand, selectExpression} from "../CalculatorControls/selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";


class Result extends Component {

    // add 'space' as thousand separator to a number
    formatNumber = number => {
        let parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    };

    render() {
        const { expression, currentOperand } = this.props;
        return (
            <Text numberOfLines={1} style={styles.result} ellipsizeMode={'middle'} >
                {this.formatNumber(currentOperand) || (expression[expression.length-1] + ' ')}
            </Text>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    expression: selectExpression,
    currentOperand: selectCurrentOperand,
});

EnhancedResult = connect(mapStateToProps)(Result);
export default EnhancedResult