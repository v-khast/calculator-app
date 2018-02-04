import React, {Component} from "react";
import {Text} from "react-native";
import styles from "./styles";
import {selectExpression, selectCurrentOperand} from "../CalculatorControls/selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

class Expression extends Component {
    render() {
        const { expression, currentOperand } = this.props;
        return (
            <Text numberOfLines={1} style={styles.question}>
                {`${expression.join(' ')} ${currentOperand}`}
            </Text>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    expression: selectExpression,
    currentOperand: selectCurrentOperand,
});

EnhancedExpession = connect(mapStateToProps)(Expression);
export default EnhancedExpession