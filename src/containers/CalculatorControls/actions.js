import * as types from './constants';

export const allClear = () => ({
  type: types.ALL_CLEAR,
});

export const operandInput = digit => ({
  type: types.OPERAND_INPUT,
  payload: digit,
});

export const operationInput = operation => ({
  type: types.OPERATION_INPUT,
  payload: operation,
});

export const toggleNegation = () => ({
  type: types.TOGGLE_NEGATION,
});

export const clearEntry = () => ({
  type: types.CLEAR_ENTRY,
});

export const calculateResult = () => ({
  type: types.CALCULATE_RESULT,
});
