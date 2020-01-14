import * as types from '../constants/actionTypes';
import axios from 'axios';

export function getAll() {
  return async function(dispatch) {
    try {
      const {data} = await axios({
        method: 'GET',
        url: '/api/entries'
      });
      dispatch({
        type: types.MERGE_ENTRIES,
        items: data.entries
      });
    } catch(e) {
      console.error(e);
    }
  };
}

export function getById(id) {
  return async function(dispatch) {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `/api/entries/${id}`
      });
      dispatch({
        type: types.MERGE_ENTRIES,
        items: [data.entries]
      });
    } catch(e) {
      console.error(e);
    }
  };
}

export function updateById(id, patch) {
  return async function(dispatch) {
    try {
      const {data} = await axios({
        method: 'PATCH',
        url: `/api/entries/${id}`,
        data: patch
      });
      dispatch({
        type: types.MERGE_ENTRIES,
        items: [data.entries]
      });
    } catch(e) {
      console.error(e);
    }
  };
}

export function removeById(id) {
  return async function(dispatch) {
    try {
      dispatch({
        type: types.REMOVE_ENTRY,
        id
      });
      await axios({
        method: 'DELETE',
        url: `/api/entries/${id}`
      });
      dispatch({
        type: types.REMOVE_ENTRY,
        id
      });
    } catch(e) {
      console.error(e);
    }
  };
}

export function create(entry) {
  return async function(dispatch) {
    try {
      const {data} = await axios({
        method: 'POST',
        url: '/api/entries',
        data: entry
      });
      dispatch({
        type: types.MERGE_ENTRIES,
        items: [data.entry]
      });
      return data.entry;
    } catch(e) {
      console.error(e);
    }
  };
}
