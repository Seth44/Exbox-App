import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import currentUser from './currentUser/reducers'
import gif from './gif/reducers'


export default combineReducers({
  router: routerReducer,
  currentUser,
  gif
})
