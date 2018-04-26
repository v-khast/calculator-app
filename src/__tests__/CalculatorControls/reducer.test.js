import reducer from '../../containers/CalculatorControls/reducer';
import * as types from '../../containers/CalculatorControls/constants';

describe('calculator reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentOperand: '0',
      expression: [],
      history: [],
      resultWasCalculated: true,
    });
  });

  it('should handle OPERAND_INPUT', () => {
    expect(
      reducer(
        {
          currentOperand: '0',
          expression: [],
          history: [],
          resultWasCalculated: true,
        },
        {
          type: types.OPERAND_INPUT,
          payload: '4',
        }
      )
    ).toEqual(
      {
        currentOperand: '4',
        expression: [],
        history: [],
        resultWasCalculated: false,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '4',
          expression: [],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.OPERAND_INPUT,
          payload: '2',
        }
      )
    ).toEqual(
      {
        currentOperand: '42',
        expression: [],
        history: [],
        resultWasCalculated: false,
      }
    );
  });

  it('should handle OPERATION_INPUT', () => {
    expect(
      reducer(
        {
          currentOperand: '42',
          expression: [],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.OPERATION_INPUT,
          payload: '*',
        }
      )
    ).toEqual(
      {
        currentOperand: '',
        expression: [42, '*'],
        history: [],
        resultWasCalculated: false,
      }
    );
  });

  it('should handle TOGGLE_NEGATION', () => {
    expect(
      reducer(
        {
          currentOperand: '3',
          expression: [42, '*'],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.TOGGLE_NEGATION,
        }
      )
    ).toEqual(
      {
        currentOperand: '-3',
        expression: [42, '*'],
        history: [],
        resultWasCalculated: false,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '-3',
          expression: [42, '*'],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.TOGGLE_NEGATION,
        }
      )
    ).toEqual(
      {
        currentOperand: '3',
        expression: [42, '*'],
        history: [],
        resultWasCalculated: false,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '0',
          expression: [42, '*'],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.TOGGLE_NEGATION,
        }
      )
    ).toEqual(
      {
        currentOperand: '0',
        expression: [42, '*'],
        history: [],
        resultWasCalculated: false,
      }
    );
  });

  it('should handle CLEAR_ENTRY', () => {
    expect(
      reducer(
        {
          currentOperand: '4',
          expression: [],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.CLEAR_ENTRY,
        }
      )
    ).toEqual(
      {
        currentOperand: '0',
        expression: [],
        history: [],
        resultWasCalculated: true,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '4242',
          expression: [],
          history: [],
          resultWasCalculated: true,
        },
        {
          type: types.CLEAR_ENTRY,
        }
      )
    ).toEqual(
      {
        currentOperand: '0',
        expression: [],
        history: [],
        resultWasCalculated: true,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '42',
          expression: [],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.CLEAR_ENTRY,
        }
      )
    ).toEqual(
      {
        currentOperand: '4',
        expression: [],
        history: [],
        resultWasCalculated: false,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '',
          expression: [42, '*'],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.CLEAR_ENTRY,
        }
      )
    ).toEqual(
      {
        currentOperand: '42',
        expression: [],
        history: [],
        resultWasCalculated: false,
      }
    );
  });

  it('should handle ALL_CLEAR', () => {
    expect(
      reducer(
        {
          currentOperand: '42',
          expression: [42, '*', 2],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.ALL_CLEAR,
        }
      )
    ).toEqual(
      {
        currentOperand: '0',
        expression: [],
        history: [],
        resultWasCalculated: true,
      }
    );
  });

  it('should handle CALCULATE_RESULT', () => {
    expect(
      reducer(
        {
          currentOperand: '42',
          expression: [42, '*', 2, '/'],
          history: [],
          resultWasCalculated: false,
        },
        {
          type: types.CALCULATE_RESULT,
        }
      )
    ).toEqual(
      {
        currentOperand: '2',
        expression: [],
        history: [{ key: '42 * 2 / 42 = 2' }],
        resultWasCalculated: true,
      }
    );

    expect(
      reducer(
        {
          currentOperand: '3',
          expression: [2, '+'],
          history: [{ key: '42 * 2 / 42 = 2' }],
          resultWasCalculated: false,
        },
        {
          type: types.CALCULATE_RESULT,
        }
      )
    ).toEqual(
      {
        currentOperand: '5',
        expression: [],
        history: [{ key: '2 + 3 = 5' }, { key: '42 * 2 / 42 = 2' }],
        resultWasCalculated: true,
      }
    );
  });
});
