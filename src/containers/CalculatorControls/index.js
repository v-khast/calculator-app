import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import CalculatorButton from "../../components/CalculatorButton";
import styles from "./styles";
import { createStructuredSelector } from "reselect";
import { clearEntry, operandInput, operationInput, toggleNegation, allClear, calculateResult } from "./actions";
import { selectCurrentOperand } from "./selectors";

class CalculatorControls extends Component {

    render() {

        const { onCalculateResult, onClearEntry, onAllClear, onToggleNegation,
            onDigitInput, onOperationInput, currentOperand } = this.props;
        const periodIsPresent = currentOperand.indexOf('.') > -1;
        const waitForNumber = currentOperand === '' || currentOperand === '-' ||
            currentOperand[currentOperand.length-1] === '.';

        return (
            <View style={styles.controls}>
                <View style={styles.row}>
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="C"
                        onPress={onClearEntry}
                        onLongPress={onAllClear}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="+/-"
                        disabled={currentOperand === '.'}
                        onPress={onToggleNegation}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="%"
                        disabled={waitForNumber}
                        onPress={() => onOperationInput("%")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="/"
                        disabled={waitForNumber}
                        onPress={() => onOperationInput("/")}
                    />
                </View>
                <View style={styles.row}>
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="7"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("7")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="8"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("8")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="9"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("9")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="*"
                        disabled={waitForNumber}
                        onPress={() => onOperationInput("*")}
                    />
                </View>
                <View style={styles.row}>
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="4"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("4")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="5"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("5")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="6"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("6")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="-"
                        disabled={waitForNumber}
                        onPress={() => onOperationInput("-")}
                    />
                </View>
                <View style={styles.row}>
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="1"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("1")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="2"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("2")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="3"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("3")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="+"
                        disabled={waitForNumber}
                        onPress={() => onOperationInput("+")}
                    />
                </View>
                <View style={styles.row}>
                    <CalculatorButton
                        style={[styles.box, styles.double, styles.darkGreen]}
                        content="0"
                        disabled={currentOperand.length > 14}
                        onPress={() => onDigitInput("0")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.darkGreen]}
                        content="."
                        disabled={waitForNumber || periodIsPresent || currentOperand.length > 14}
                        onPress={() => onDigitInput(".")}
                    />
                    <CalculatorButton
                        style={[styles.box, styles.green]}
                        content="="
                        disabled={waitForNumber}
                        onPress={onCalculateResult}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentOperand: selectCurrentOperand,
});

const mapDispatchToProps = {
    onDigitInput: operandInput,
    onOperationInput: operationInput,
    onClearEntry: clearEntry,
    onAllClear: allClear,
    onToggleNegation: toggleNegation,
    onCalculateResult: calculateResult
};

EnhancedCalculatorControls = connect(mapStateToProps, mapDispatchToProps)(CalculatorControls);
export default EnhancedCalculatorControls;
