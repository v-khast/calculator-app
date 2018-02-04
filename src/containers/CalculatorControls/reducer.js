import { OPERAND_INPUT, OPERATION_INPUT, TOGGLE_NEGATION, CLEAR_ENTRY, ALL_CLEAR, CALCULATE_RESULT } from "./constants"

const initialState = {
    currentOperand: '0',
    expression: [],
    history: [],
    waitForNumber: false,
    periodIsPresent: false,
    resultWasCalculated: true,
};

export default function calculator(state = initialState, action) {

    switch (action.type) {

        case OPERAND_INPUT: {
            return {
                ...state,
                currentOperand: state.resultWasCalculated ? action.payload : state.currentOperand + action.payload,
                waitForNumber: action.payload === '.',
                periodIsPresent: action.payload === '.' || state.currentOperand.indexOf('.') > -1,
                resultWasCalculated: false
            }
        }

        case OPERATION_INPUT: {
            return {
                ...state,
                currentOperand: '',
                expression: [...state.expression, parseFloat(state.currentOperand), action.payload],
                waitForNumber: true,
                resultWasCalculated: false
            }
        }

        case TOGGLE_NEGATION: {
            return {
                ...state,
                periodIsPresent: action.payload.periodIsPresent,
                currentOperand: action.payload.currentOperand,
                waitForNumber: action.payload.waitForNumber,
                resultWasCalculated: false
            };
        }

        case CLEAR_ENTRY: {
            return {
                ...state,
                currentOperand: action.payload.currentOperand,
                expression: action.payload.expression,
                waitForNumber: action.payload.waitForNumber,
                periodIsPresent: action.payload.periodIsPresent,
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
                periodIsPresent: action.payload.result.indexOf('.') > -1,
                history: [action.payload.historyItem, ...state.history],
                resultWasCalculated: true
            }
        }

        default:
            return state;
    }

}