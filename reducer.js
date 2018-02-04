import { combineReducers } from 'redux'
import calculator from './src/containers/CalculatorControls/reducer'

const rootReducer = combineReducers({
    calculatorState: calculator,
});

export default rootReducer