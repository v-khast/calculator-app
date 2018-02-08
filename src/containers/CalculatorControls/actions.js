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
    if ( currentOperand !== '' && currentOperand !== '-' ) {
        return {
            type: types.TOGGLE_NEGATION,
            payload: (-1 * currentOperand).toString()
        };
    } else {
        const maybeZero = expression.length > 0 ? '' : '0';
        return {
            type: types.TOGGLE_NEGATION,
            payload: currentOperand === '' ? '-' : maybeZero
        };
    }
};

export const clearEntry = (currentOperand, expression, resultWasCalculated) => {
    if ( resultWasCalculated || (currentOperand.length === 1 && expression.length === 0) ) {
        return {
            type: types.CLEAR_ENTRY,
            payload: {
                currentOperand: '0',
                expression: [],
                resultWasCalculated: true,
            }
        };
    } else if ( currentOperand !== '' ) {
        // clear a number entry
        return {
            type: types.CLEAR_ENTRY,
            payload: {
                currentOperand: currentOperand.slice(0, -1),
                expression: expression,
                resultWasCalculated: false,
            }
        };
    } else {
        // clear an operation entry
        return {
            type: types.CLEAR_ENTRY,
            payload: {
                currentOperand: expression.slice( expression.length - 2, expression.length - 1 ).toString(),
                expression: expression.slice(0, -2),
                resultWasCalculated: false,
            }
        };
    }
};

/**
 * Basic logic: 1. Go through operator groups (lower group index = higher precedence)
 *              2. Perform the calculations for each group
 * @param expression - array of operands and operators
 * @returns calculationResult
 */

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

    const finalResult = parseFloat(answer[0].toFixed(12));

    return {
        type: types.CALCULATE_RESULT,
        payload: {
            result: finalResult.toString(),
            historyItem: {
                key: [
                    ...expression,
                    '=',
                    finalResult
                ].join(' ')
            }
        }
    }
};