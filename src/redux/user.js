import { createSlice } from '@reduxjs/toolkit';
// utils
import Snackbar from './../lib/snackbar';
import { api } from './../api';
//
import { dispatch } from './store';
// ---------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  currentuser: null,
  users:[]
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // CREATE BANK
    hasSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
    },

    // GET USER
    getCurrentUser(state, action) {
      state.isLoading = false;
      state.currentuser = action.payload;
    },

    // GET LIST USERS
    getUsers(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;



// ----------------------------------------------------------------------

export function getMe() {
  return async () => {
    dispatch(slice.actions.startLoading());
      try {
        
        const response = await api.get('/users/me');
          
        // const response = null;
      dispatch(slice.actions.getCurrentUser(response.data));
      } catch (error) {
        console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function listUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get('/users');

      dispatch(slice.actions.getUsers(response.data));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function createAccount(payload) {
  return async () => {
    console.log(payload, 'payload');
    try {
      dispatch(slice.actions.startLoading());
      const response = await api.post('/users/oauth/users', payload);
      console.log(response.data, 'response');
      Snackbar.success('Create success!');
      dispatch(slice.actions.hasSuccess(response.data));
    } catch (error) {
      console.log(error, 'error');
      Snackbar.error('error');
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
export function deleteAccount(payload) {
  return async () => {
    console.log(payload, 'payload');
    try {
      dispatch(slice.actions.startLoading());
      const response = await api.delete('/users/delete/'+payload);
      console.log(response.data, 'response');
      Snackbar.success('delete success!');
      dispatch(slice.actions.hasSuccess(response.data));
    } catch (error) {
      console.log(error, 'error');
      Snackbar.error('error');
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
export function changeStatus(payload) {
  return async () => {
    console.log(payload, 'payload');

    try {
      dispatch(slice.actions.startLoading());
      const response = await api.put(`/users/${payload.id}/manage_blocks`, { type: payload.type });
      console.log(response, 'response');
      Snackbar.success('Update success!');
      dispatch(slice.actions.hasSuccess(response.data));
    } catch (error) {
      console.log(error, 'error');
      Snackbar.error('error');
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Actions


