import {ACTIONS} from './App'
import React from 'react'
import PropTypes from 'prop-types'

const OperationButton = ({dispatch,operation}) => {
  
  return (
    <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPRATION,paylod:{operation}})}>{operation}</button>
  )
}

OperationButton.propTypes = {}

export default OperationButton
