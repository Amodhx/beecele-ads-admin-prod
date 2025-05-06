// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import loading from "./loading"

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  loading
})

export default rootReducer
