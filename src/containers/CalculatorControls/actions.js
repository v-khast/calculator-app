import * as types from './constants'

export const allClear = () => ({
    type: types.ALL_CLEAR,
});

export const operandInput = digit => ({
    type: types.OPERAND_INPUT,
    payload: digit
});

export const operationInput = operation => ({
    type: types.OPERATION_INPUT,
    payload: operation
});

export const toggleNegation = (currentOperand, expression) => {
    const action = {
        type: types.TOGGLE_NEGATION,
        payload: {}
    };
    const setPayload = (currentOperand, periodIsPresent, waitForNumber) => {
        action.payload.currentOperand = currentOperand;
        action.payload.periodIsPresent = periodIsPresent;
        action.payload.waitForNumber = waitForNumber;
    };
    if ( currentOperand !== '' && currentOperand !== '-' ) {
        const newCurrentOperand = (-1 * currentOperand).toString();
        setPayload(newCurrentOperand, newCurrentOperand.indexOf('.') > -1, false);
    } else {
        const maybeZero = expression.length > 0 ? '' : '0';
        const newCurrentOperand = currentOperand === '' ? '-' : maybeZero;
        setPayload(newCurrentOperand, false, true);
    }
    return action;
};

export const clearEntry = (currentOperand, expression, resultWasCalculated) => {
    const action = {
        type: types.CLEAR_ENTRY,
        payload: {}
    };
    const setPayload = (currentOperand, expression, waitForNumber, periodIsPresent, resultWasCalculated) => {
        action.payload.currentOperand = currentOperand;
        action.payload.expression = expression;
        action.payload.waitForNumber = waitForNumber;
        action.payload.periodIsPresent = periodIsPresent;
        action.payload.resultWasCalculated = resultWasCalculated;
    };
    if ( resultWasCalculated || (currentOperand.length === 1 && expression.length === 0) ) {
        setPayload('0', [], false, false, true);
    } else if ( currentOperand !== '' ) {
        // clear a number entry
        const updatedCurrentOperand = currentOperand.slice(0, -1);
        const currentOperandIsTooShort = currentOperand.length === 1 ||
            ( currentOperand.length === 2 && currentOperand.indexOf('-') > -1 );
        setPayload(
            updatedCurrentOperand,
            expression,
            updatedCurrentOperand === "." || currentOperandIsTooShort,
            updatedCurrentOperand.indexOf('.') > -1,
            false
        );
    } else {
        // clear an operation entry
        const updatedCurrentOperand =
            expression
                .slice( expression.length - 2, expression.length - 1 )
                .toString();
        setPayload(
            updatedCurrentOperand,
            expression.slice(0, -2),
            false,
            updatedCurrentOperand.indexOf('.') > -1,
            false
        );
    }
    return action;
};

/**
 * Basic logic: 1. Go through operator groups (lower group index = higher precedence)
 *              2. Perform the calculations for each group
 * @param expression - array of operands and operators
 * @returns calculationResult
 */

// todo: refactor.
export const calculateResult = (expression) => {
    const operatorGroups = [
        {
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
            '%': (a, b) => a % b,
        },
        {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b
        }
    ];

    // process each precedence group
    const calculationResult = (input) => operatorGroups.reduce((result, operatorGroup) => {
        // make calculations for each operation within precedence group
        return result.input.reduce((newCalculationData, inputValue) => {
            if ( operatorGroup[inputValue] ) {
                return {
                    ...newCalculationData,
                    currentOperator: operatorGroup[inputValue]
                };
            } else if ( newCalculationData.currentOperator ) {
                const newInput = newCalculationData.input.map((previousValue, index) =>
                    index === newCalculationData.input.length - 1 ?
                        newCalculationData.currentOperator(previousValue, inputValue) :
                        previousValue
                );
                return {
                    input: newInput,
                    currentOperator: null
                }
            } else {
                return {
                    ...newCalculationData,
                    input: [
                        ...newCalculationData.input,
                        inputValue
                    ]
                }
            }
        }, { input: [], currentOperator: null } );
    }, input);

    const answer = calculationResult({ input: expression, currentOperator: null }).input;

    if (answer.length > 1) {
        alert('Error: unable to resolve calculation');
    }

    return {
        type: types.CALCULATE_RESULT,
        payload: {
            result: answer[0].toString(),
            historyItem: {
                key: [
                    ...expression,
                    '=',
                    answer[0]
                ].join(' ')
            }
        }
    }
};