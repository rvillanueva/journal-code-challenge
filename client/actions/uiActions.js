import {SET_DRAWER_VISIBILITY} from '../constants/actionTypes';

export function setDrawerVisibility(isOpen) {
  return async function(dispatch) {
    dispatch({
      type: SET_DRAWER_VISIBILITY,
      isOpen
    });
  };
}
