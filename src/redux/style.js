import { createSlice } from '@reduxjs/toolkit';
import { Alert } from '@mui/material';

import Snackbar from './../lib/snackbar';
import { api } from './../api';

//
import { dispatch } from './store';

// ---------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  style: {
    currentTabU: 'general',
    currentTabTenant: 'account',
    colorText: '#001c35',
    themecolorpresets: 'default',
    width: '100%',
    pagelogin: [],
    logo: [],
    logo_white: [],
    bg_mobile_p: [],
    avatar: '',
    login_page: '',
    white_logo: '',
    black_logo: '',
    style_file: '',
    theme_web: '',
    theme_mobile: '',
    bg_mobile: '',
    theme_object: [],
  },
};

const slice = createSlice({
  name: 'style',
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
    // GET COLUMN
    updateStyleColumnSuccess(state, action) {
      const column = action.payload;
      state.isLoading = false;
      state.style[column.columnId] = column.value;
      console.log(state.style[column.columnId], 'column.columnId');
    },

    // GET
    updateStyleSuccess(state, action) {
      const column = action.payload;
      state.isLoading = false;
      state.currentTabU = column;
      console.log(state.style[column.columnId]);
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function updateStyleColumn(value, columnId) {
  let payload = { value, columnId };
  console.log(payload, 'payload Style');
  return (dispatch) => {
    dispatch(slice.actions.updateStyleColumnSuccess(payload));
  };
}

// ----------------------------------------------------------------------
export function updateStyle(value, columnId) {
  let payload = { value, columnId };
  console.log(payload, 'payload Style');
  return (dispatch) => {
    dispatch(slice.actions.updateStyleSuccess(payload));
  };
}

// ----------------------------------------------------------------------

export function handleCreateFile(payload, field, bl = false) {
  return async () => {
    try {
      if (bl) {
        const fileData = JSON.stringify(payload);
        const blob = new Blob([fileData], { type: 'application/json' });
        payload = blob;
      }

      dispatch(slice.actions.startLoading());

      let fileInfo = new FormData();
      fileInfo.append('file', payload);
      const { data } = await api.post('/users/file', fileInfo);
      let id = data.id;
      dispatch(updateStyleColumn(id, field));
      dispatch(slice.actions.hasSuccess());

      Snackbar.success('Successful Upload!');
      return true;
    } catch (error) {
      console.log(error, 'erorr');
      Snackbar.error('Upload Failed!');
      dispatch(slice.actions.hasError());
    }
  };
}
