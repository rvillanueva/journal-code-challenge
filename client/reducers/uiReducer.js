import {SET_DRAWER_VISIBILITY, LOGOUT} from '../constants/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function contactReducer(state = initialState.ui, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.ui;
  case SET_DRAWER_VISIBILITY:
    return Object.assign({}, state, {drawerIsOpen: action.isOpen});
  default:
    return state;
  }
}
