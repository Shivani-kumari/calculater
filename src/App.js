import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import { useReducer } from 'react';
import './App.css';
export const ACTIONS ={
  ADD_DIGIT :'add-digit',
  CHOOSE_OPRATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate',
}
function reducer(state,{type,paylod}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:paylod.digit,
          overwrite:false
        }
      }
      if(paylod.digit === "0" && state.currentOperand === '0') return state
      if(paylod.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand:`${state.currentOperand || ''}${paylod.digit}`,
      }
      case ACTIONS.CHOOSE_OPRATION:
        if(state.currentOperand == null && state.previousOperand == null){
          return state
        }
        if(state.currentOperand == null){
          return {
            ...state,
            operation : paylod.operation,
          }
        }
        if(state.previousOperand == null){
          return{
            ...state,
            operation:paylod.operation,
            previousOperand:state.currentOperand,
            currentOperand:null,
          }
        }
        return {
          ...state,
          previousOperand:evaluate(state),
          operation:paylod.operation,
          currentOperand:null
        }

        case ACTIONS.EVALUATE:
          if(state.operation == null || 
            state.currentOperand == null || 
            state.previousOperand == null){
              return state
            }
            return {
              ...state,
              overwrite:true,
              previousOperand : null,
              operation:null,
              currentOperand:evaluate(state)
            }
        
      case ACTIONS.CLEAR:
        return {}

        case ACTIONS.DELETE_DIGIT:
          if(state.overwrite){
            return{
              ...state,
              overwrite:false,
              currentOperand:null
            }
          }
          if(state.currentOperand.length==1){
            return{...state,currentOperand:null}
          }
          return {
            ...state,
            currentOperand:state.currentOperand.slice(0,-1)
          }
  }
}

function evaluate({currentOperand,previousOperand,operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break;
      case "-":
        computation = prev - current
        break;
      case "*":
        computation = prev * current
      break;
  }
  return computation.toString()
}

function App() {
  // const [state,dispatch] = useReducer(reducer,{})
  const [{currentOperand,previousOperand,opration},dispatch] = useReducer(reducer,{})
  
  
  return (
    <div className="calclator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{opration}{console.log(opration,"operation")}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <button className="span-two"  onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>= </button>
    </div>
  );
}

export default App;
