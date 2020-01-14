import { combineReducers } from 'redux';
import auth from './authReducer';
import users from './userReducer';
import overlay from './overlayReducer';
import ui from './uiReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  auth,
  users,
  overlay,
  ui,
  router: connectRouter(history)
});

export default rootReducer;
