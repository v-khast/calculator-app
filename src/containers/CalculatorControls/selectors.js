import { createSelector } from 'reselect';

export const selectCalculatorState = state => state.calculatorState;
export const selectHistory =
  createSelector(selectCalculatorState, calculatorState => calculatorState.history);
export const selectExpression =
  createSelector(selectCalculatorState, calculatorState => calculatorState.expression);
export const selectCurrentOperand =
  createSelector(selectCalculatorState, calculatorState => calculatorState.currentOperand);
