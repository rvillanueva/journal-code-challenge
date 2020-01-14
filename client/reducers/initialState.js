import {initializeNormalState} from '../utils/normalize';

export default {
  auth: {
    isAuthenticating: false,
    user: null,
    activeAccountId: null
  },
  ui: {
    drawerIsOpen: false
  },
  users: initializeNormalState(),
  overlay: {
    isVisible: false,
    type: null,
    data: {}
  }
};
