import { OPERAND_INPUT, OPERATION_INPUT, TOGGLE_NEGATION, CLEAR_ENTRY, ALL_CLEAR, CALCULATE_RESULT } from "./constants"

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
            return {
                ...state,
                currentOperand: action.payload,
                resultWasCalculated: false
            };
        }

        case CLEAR_ENTRY: {
            return {
                ...state,
                currentOperand: action.payload.currentOperand,
                expression: action.payload.expression,
                resultWasCalculated: action.payload.resultWasCalculated
            }
        }

        case ALL_CLEAR: {
            return {
                ...initialState,
                history: state.history
            }
        }

        case CALCULATE_RESULT: {
            return {
                ...initialState,
                currentOperand: action.payload.result,
                history: [action.payload.historyItem, ...state.history],
                resultWasCalculated: true
            }
        }

        default:
            return state;
    }

}