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
  currenttenant: {},
  tenants: [],
};

const slice = createSlice({
  name: 'tenant',
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

    // CREATE TENANT
    hasSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
    },

    // Set TENANT
    setCurrentTenant(state, action) {
      state.isLoading = false;
      state.currenttenant = action.payload;
    },

    // GET LIST TENANTS
    getTenants(state, action) {
      state.isLoading = false;
      state.tenants = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
// ----------------------------------------------------------------------
// Actions
export const { setCurrentTenant } = slice.actions;


export function listTenants(url) {
  return async () => {
    dispatch(slice.actions.startLoading());

    let limit = url ? `$${url}&`:'';
    try {
      const response = await api.get(
        `/wtl/tenants?${limit}$select=key,domain,theme_web,theme_mobile,name,theme_image,created_at,id`
      );
      dispatch(slice.actions.getTenants(response.data));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function createTenant(payload) {
  return async () => {

    try {
      dispatch(slice.actions.startLoading());
      const response = await api.post('/wtl/tenants', payload);
      
      dispatch(slice.actions.hasSuccess(response.data));
      Snackbar.success('Create success!');

    } catch (error) {

      dispatch(slice.actions.hasError(error));
      console.log(error, 'error');
      Snackbar.error('Create Failed!');
    }
  };
}
// ----------------------------------------------------------------------
export function deleteTenant(payload) {
  return async () => {
    console.log(payload, 'payload');
    try {
      dispatch(slice.actions.startLoading());
      const response = await api.delete('/wtl/tenants/delete/' + payload);
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
