/**
 * Basic logic: 1. Go through operator groups (lower group index = higher precedence)
 *              2. Perform the calculations for each group
 * @param expression - array of operands and operators
 * @returns calculation result
 */
const expressionEvaluation = (expression) => {
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

    return parseFloat(answer[0].toFixed(12));
};

export default expressionEvaluation;