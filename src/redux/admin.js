import { createSlice } from '@reduxjs/toolkit';
import Snackbar from './../lib/snackbar';
// utils
import { api } from './../api';

//
import { dispatch } from './store';

// ---------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  dashboard: [],
  usersyear:null,
};

const slice = createSlice({
  name: 'admin',
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

    // HAS SUCCESS
    hasSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.dashboard = action.payload;
    },
    // HAS SUCCESS
    hasSuccessUser(state, action) {
      state.isLoading = false;
      state.error = false;
      state.usersyear = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function dashboardUser() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get('/root/dashboard');
      dispatch(slice.actions.hasSuccess(response.data));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}



export function usersYear() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get('/root/usersyear');
      console.log(response.data, 'response.data');
      dispatch(slice.actions.hasSuccessUser(response.data));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}
