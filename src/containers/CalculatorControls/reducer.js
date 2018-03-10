import { OPERAND_INPUT, OPERATION_INPUT, TOGGLE_NEGATION,
  CLEAR_ENTRY, ALL_CLEAR, CALCULATE_RESULT } from './constants';
import { expressionEvaluation, performClearEntry,
  performToggleNegation } from '../../utils/expressionEvaluation';

const initialState = {
  currentOperand: '0',
  expression: [],
  history: [],
  resultWasCalculated: true,
};

export default function calculator(state = initialState, action) {

  switch (action.type) {

    case OPERAND_INPUT: {
      return {
        ...state,
        currentOperand: state.resultWasCalculated ?
          action.payload :
          state.currentOperand + action.payload,
        resultWasCalculated: false,
      };
    }

    case OPERATION_INPUT: {
      return {
        ...state,
        currentOperand: '',
        expression: [...state.expression, parseFloat(state.currentOperand), action.payload],
        resultWasCalculated: false,
      };
    }

    case TOGGLE_NEGATION: {
      const updatedCurrentOperand = performToggleNegation(state.currentOperand, state.expression);
      return {
        ...state,
        currentOperand: updatedCurrentOperand,
        resultWasCalculated: false,
      };
    }

    case CLEAR_ENTRY: {
      if (state.resultWasCalculated ||
        (state.currentOperand.length === 1 && state.expression.length === 0)) {
        return {
          ...initialState,
          history: state.history,
        };
      }

      const { currentOperand, expression } =
        performClearEntry(state.currentOperand, state.expression);
      return {
        ...state,
        currentOperand: currentOperand,
        expression: expression,
        resultWasCalculated: false,
      };
    }

    case ALL_CLEAR: {
      return {
        ...initialState,
        history: state.history,
      };
    }

    case CALCULATE_RESULT: {
      const expression = [...state.expression, parseFloat(state.currentOperand)];
      const answer = expressionEvaluation(expression);
      return {
        ...initialState,
        currentOperand: answer.toString(),
        history: [{ key: [...expression, '=', answer].join(' ') }, ...state.history],
        resultWasCalculated: true,
      };
    }

    default:
      return state;
  }

}
