import { OPERAND_INPUT, OPERATION_INPUT, TOGGLE_NEGATION, CLEAR_ENTRY, ALL_CLEAR, CALCULATE_RESULT } from "./constants"
import expressionEvaluation from "../../utils/expressionEvaluation";

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
                currentOperand: state.resultWasCalculated ? action.payload : state.currentOperand + action.payload,
                resultWasCalculated: false
            }
        }

        case OPERATION_INPUT: {
            return {
                ...state,
                currentOperand: '',
                expression: [...state.expression, parseFloat(state.currentOperand), action.payload],
                resultWasCalculated: false
            }
        }

        case TOGGLE_NEGATION: {
            let updatedCurrentOperand = '';
            if ( state.currentOperand !== '' && state.currentOperand !== '-' ) {
                updatedCurrentOperand = (-1 * state.currentOperand).toString();
            } else {
                const maybeZero = state.expression.length > 0 ? '' : '0';
                updatedCurrentOperand = state.currentOperand === '' ? '-' : maybeZero;
            }
            return {
                ...state,
                currentOperand: updatedCurrentOperand,
                resultWasCalculated: false
            };
        }

        case CLEAR_ENTRY: {
            let updatedCurrentOperand = initialState.currentOperand;
            let updatedExpression = initialState.expression;
            if ( state.resultWasCalculated || (state.currentOperand.length === 1 && state.expression.length === 0) ) {
                return {
                    ...initialState,
                    history: state.history,
                }
            } else if ( state.currentOperand !== '' ) {
                updatedCurrentOperand = state.currentOperand.slice(0, -1);
                updatedExpression = state.expression;
            } else {
                updatedCurrentOperand =
                    state.expression.slice( state.expression.length - 2, state.expression.length - 1 ).toString();
                updatedExpression = state.expression.slice(0, -2);
            }
            return {
                ...state,
                currentOperand: updatedCurrentOperand,
                expression: updatedExpression,
                resultWasCalculated: false
            }
        }

        case ALL_CLEAR: {
            return {
                ...initialState,
                history: state.history
            }
        }

        case CALCULATE_RESULT: {
            const expression = [...state.expression, parseFloat(state.currentOperand)];
            const answer = expressionEvaluation(expression);
            return {
                ...initialState,
                currentOperand: answer.toString(),
                history: [ {key: [...expression, '=', answer].join(' ')}, ...state.history ],
                resultWasCalculated: true
            }
        }

        default:
            return state;
    }

}