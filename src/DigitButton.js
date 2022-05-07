import {ACTIONS} from './App'
import React from 'react'
import PropTypes from 'prop-types'

const DigitButton = ({dispatch,digit}) => {
    
  return (
    <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,paylod:{digit}})}>{digit}</button>
  )
}

DigitButton.propTypes = {}

export default DigitButton
