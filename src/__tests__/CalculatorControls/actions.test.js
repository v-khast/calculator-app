import * as actions from '../../containers/CalculatorControls/actions';
import * as types from '../../containers/CalculatorControls/constants';

describe('actions', () => {
  it('should create an action to clear the input (all clear)', () => {
    const expectedAction = {
      type: types.ALL_CLEAR,
    };
    expect(actions.allClear()).toEqual(expectedAction);
  });

  it('should create an action to clear an entry (clear entry)', () => {
    const expectedAction = {
      type: types.CLEAR_ENTRY,
    };
    expect(actions.clearEntry()).toEqual(expectedAction);
  });

  it('should create an action to an operand input', () => {
    const expectedAction = {
      type: types.OPERAND_INPUT,
      payload: '3',
    };
    expect(actions.operandInput('3')).toEqual(expectedAction);
  });

  it('should create an action to an operation input', () => {
    const expectedAction = {
      type: types.OPERATION_INPUT,
      payload: '+',
    };
    expect(actions.operationInput('+')).toEqual(expectedAction);
  });

  it('should create an action to toggle negation symbol', () => {
    const expectedAction = {
      type: types.TOGGLE_NEGATION,
    };
    expect(actions.toggleNegation()).toEqual(expectedAction);
  });

  it('should create an action to calculate the result', () => {
    const expectedAction = {
      type: types.CALCULATE_RESULT,
    };
    expect(actions.calculateResult()).toEqual(expectedAction);
  });
});
