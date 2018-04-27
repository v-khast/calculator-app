import configureMockStore from 'redux-mock-store';
import reducer from '../../containers/CalculatorControls/reducer';
import { clearEntry, operandInput, operationInput,
  toggleNegation, allClear, calculateResult } from '../../containers/CalculatorControls/actions';

const mockStore = configureMockStore();

const calculatorTester = (state, action) => {
  const store = mockStore(state);
  store.dispatch(action);
  return reducer(state, store.getActions()[0]);
};

const initialState = {
  currentOperand: '0',
  expression: [],
  history: [],
  resultWasCalculated: true,
};


describe('calculator reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  let nextState = calculatorTester(initialState, operandInput('4'));

  it('should handle OPERAND_INPUT', () => {
    expect(nextState.currentOperand).toEqual('4');
    expect(nextState.resultWasCalculated).toEqual(false);

    nextState = calculatorTester(nextState, operandInput('2'));
    expect(nextState.currentOperand).toEqual('42');
    expect(nextState.resultWasCalculated).toEqual(false);
  });

  it('should handle OPERATION_INPUT', () => {
    nextState = calculatorTester(nextState, operationInput('*'));
    expect(nextState).toEqual({
      currentOperand: '',
      expression: [42, '*'],
      history: [],
      resultWasCalculated: false,
    });
  });

  it('should handle TOGGLE_NEGATION', () => {
    nextState = calculatorTester(nextState, toggleNegation());
    expect(nextState.currentOperand).toEqual('-');
    nextState = calculatorTester(nextState, operandInput('3'));
    nextState = calculatorTester(nextState, toggleNegation());
    expect(nextState.currentOperand).toEqual('3');
    nextState = calculatorTester(nextState, toggleNegation());
    expect(nextState.currentOperand).toEqual('-3');
  });

  it('should handle CLEAR_ENTRY', () => {
    nextState = calculatorTester(nextState, clearEntry());
    expect(nextState.currentOperand).toEqual('-');
    nextState = calculatorTester(nextState, clearEntry());
    expect(nextState).toEqual({
      currentOperand: '',
      expression: [42, '*'],
      history: [],
      resultWasCalculated: false,
    });
    nextState = calculatorTester(nextState, clearEntry());
    expect(nextState).toEqual({
      currentOperand: '42',
      expression: [],
      history: [],
      resultWasCalculated: false,
    });
  });

  it('should handle ALL_CLEAR', () => {
    nextState = calculatorTester(nextState, operationInput('*'));
    nextState = calculatorTester(nextState, operandInput('2'));
    nextState = calculatorTester(nextState, allClear());
    expect(nextState).toEqual(initialState);
  });

  it('should handle CALCULATE_RESULT', () => {
    nextState = calculatorTester(nextState, operandInput('42'));
    nextState = calculatorTester(nextState, operationInput('*'));
    nextState = calculatorTester(nextState, operandInput('2'));
    nextState = calculatorTester(nextState, calculateResult());
    expect(nextState).toEqual({
      currentOperand: '84',
      expression: [],
      history: [{ key: '42 * 2 = 84' }],
      resultWasCalculated: true,
    });
    nextState = calculatorTester(nextState, operationInput('/'));
    nextState = calculatorTester(nextState, operandInput('2'));
    nextState = calculatorTester(nextState, calculateResult());
    expect(nextState).toEqual({
      currentOperand: '42',
      expression: [],
      history: [{ key: '84 / 2 = 42' }, { key: '42 * 2 = 84' }],
      resultWasCalculated: true,
    });
  });
});
