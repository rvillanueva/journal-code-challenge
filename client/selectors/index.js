import { toArray } from '../utils/normalize';

export const selectUsers = state => toArray(state.users);

export const selectAllAccounts = state => toArray(state.accounts);
export const selectActiveUser = state => state.auth.user;

export const selectAllUsers = state => toArray(state.users);
