/**
 * Basic logic: 1. Go through operator groups (lower group index = higher precedence)
 *              2. Perform the calculations for each group
 * @param expression - array of operands and operators
 * @returns calculation result
 */
export const expressionEvaluation = (expression) => {
  const operatorGroups = [
    {
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '%': (a, b) => a % b,
    },
    {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    },
  ];

  // process each precedence group
  const calculationResult = (input) => operatorGroups.reduce((result, operatorGroup) =>

  // make calculations for each operation within precedence group
    result.input.reduce((newCalculationData, inputValue) => {
      if (operatorGroup[inputValue]) {
        return {
          ...newCalculationData,
          currentOperator: operatorGroup[inputValue],
        };
      } else if (newCalculationData.currentOperator) {
        const newInput = newCalculationData.input.map((previousValue, index) =>
          index === newCalculationData.input.length - 1 ?
            newCalculationData.currentOperator(previousValue, inputValue) :
            previousValue,
        );
        return {
          input: newInput,
          currentOperator: null,
        };
      }
      return {
        ...newCalculationData,
        input: [
          ...newCalculationData.input,
          inputValue,
        ],
      };
    }, { input: [], currentOperator: null }), input);

  const answer = calculationResult({ input: expression, currentOperator: null }).input;

  return parseFloat(answer[0].toFixed(12));
};

export const performToggleNegation = (currentOperand, expression) => {
  if (currentOperand !== '' && currentOperand !== '-') {
    return (-1 * currentOperand).toString();
  }

  const maybeZero = expression.length > 0 ? '' : '0';
  return currentOperand === '' ? '-' : maybeZero;
};

export const performClearEntry = (currentOperand, expression) => {
  if (currentOperand !== '') {
    return {
      currentOperand: currentOperand.slice(0, -1),
      expression,
    };
  }

  return {
    currentOperand: expression.slice(expression.length - 2, expression.length - 1).toString(),
    expression: expression.slice(0, -2),
  };
};
