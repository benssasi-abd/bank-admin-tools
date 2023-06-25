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
    theme_imgs: null,
    bg_mobile: '',
    environment: '',
    theme_object: [],
    img_upload: {},
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
    },

    // SET
    updateStyleSuccess(state, action) {
      const column = action.payload;
      state.isLoading = false;
      state.currentTabU = column;

    },

    // SET
    updateFileSuccess(state, action) {
      state.isLoading = false;
      let key = Object.keys(action.payload);
      let val = Object.values(action.payload);

      let field = val[0];
      key = key[1];

      val = val[1];

      state.style[field] = { ...state.style[field], [key]: val };
    },

    // Remove Key
    removeKeySuccess(state, action) {
      state.isLoading = false;
      const column = action.payload;
      let key = column.columnId;
      let val = column.field;
      let obj = state.style[key];
      delete obj[val];

      state.style[key] = obj;
    },

    // GET
    updateInitialState(state, action) {
      state.style = initialState.style;

    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { updateInitialState } = slice.actions;

// ----------------------------------------------------------------------
export function updateStyleColumn(value, columnId) {
  let payload = { value, columnId };

  return (dispatch) => {
    dispatch(slice.actions.updateStyleColumnSuccess(payload));
  };
}
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export function removeKey(field, columnId) {
  let payload = { field, columnId };

  return (dispatch) => {
    dispatch(slice.actions.removeKeySuccess(payload));
  };
}
// ----------------------------------------------------------------------

export function resetState() {
  return (dispatch) => {
    dispatch(slice.actions.updateInitialState());
  };
}

// ----------------------------------------------------------------------
export function updateStyle(value, columnId) {
  let payload = { value, columnId };

  return (dispatch) => {
    dispatch(slice.actions.updateStyleSuccess(payload));
  };
}

// ----------------------------------------------------------------------

export function handleCreateFile(payload, field, bl = false, json = true, type = 'application/json') {
  return async () => {
    try {
      if (bl) {
        const fileData = json ? JSON.stringify(payload) : payload;
        const blob = new Blob([fileData], { type: type });
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
    } catch (error) {
      console.log(error, 'erorr');
      Snackbar.error('Upload Failed!');
      dispatch(slice.actions.hasError());
    }
  };
}

// ----------------------------------------------------------------------

export function handleCreateFiles(payload, el, field, bl = false) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());

      let fileInfo = new FormData();

      fileInfo.append('file', payload);

      const { data } = await api.post('/users/file', fileInfo);
      let id = data.id;
      let url = data.url;



      let p = { f: field, [el]: url };

      dispatch(slice.actions.updateFileSuccess(p));

      dispatch(slice.actions.hasSuccess());

      Snackbar.success('Successful Upload!');
    } catch (error) {
      console.log(error, 'erorr');
      Snackbar.error('Upload Failed!');
      dispatch(slice.actions.hasError());
    }
  };
}
