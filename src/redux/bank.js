import { createSlice } from '@reduxjs/toolkit';
import Snackbar from './../lib/snackbar';
// utils
// import axios from '../../utils/axios';

import { api } from './../api';

//
import { dispatch } from './store';

// ---------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  banks: [],
  _newbanks: [],
  bank: null,
  bankAccount: {
    key: '',
    photoURL: null,
    email: '',
    name: '',
    avatar: '',
    phoneNumber: '',
    namebank: '',
    login_page: '',
    white_logo: '',
    black_logo: '',
    style: '',
    url: '',
  },
};

const slice = createSlice({
  name: 'bank',
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
    },

    // GET LIST USERS
    getBanks(state, action) {
      state.error = false;
      state.isLoading = false;
      state.banks = action.payload;
    },
    // GET LIST NEW USERS
    getnewbanks(state, action) {
      state.error = false;
      state.isLoading = false;
      state._newbanks = action.payload;
    },
    // CREATE BANK
    createBankSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.bank = action.payload;
    },
    // UPDATE COLUMN
    updatebankAccountSuccess(state, action) {
      const column = action.payload;
      state.isLoading = false;
      state.bankAccount[column.columnId] = column.value;
      console.log(state.bankAccount[column.columnId]);
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function listBanks() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get(
        '/wtl/banks?$select=users.id,banks.id as bank_id ,banks.name,email,avatar,url,login_page,white_logo,black_logo,style_file,add_by,status'
      );

      dispatch(slice.actions.getBanks(response.data));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createAccountBank(payload) {
  return async () => {
    console.log(payload, 'payload');
    try {
      dispatch(slice.actions.startLoading());
      const response = await api.post('/wtl/banks', payload);
      console.log(response.data, 'response');
      Snackbar.success('Update success!');
      dispatch(slice.actions.createBankSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log(error, 'error');
      Snackbar.error('error');
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
export function deleteAccountBank(payload) {
  return async () => {
    try {
      console.log(payload, 'payload');
      dispatch(slice.actions.startLoading());
      const response = await api.delete('/wtl/delete/' + payload);
      Snackbar.success('delete success!');
      dispatch(slice.actions.hasSuccess(response.data));
    } catch (error) {
      Snackbar.error('error');
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
export function updatebankColumn(value, columnId) {
  let payload = { value, columnId };
  return (dispatch) => {
    dispatch(slice.actions.updatebankAccountSuccess(payload));
  };
}
// ----------------------------------------------------------------------
export function getBanksNew() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.get(
        '/wtl/banks?$limit=5&$select=banks.name,email,avatar,url,login_page,white_logo,black_logo,style_file,status'
      );
      dispatch(slice.actions.getnewbanks(response.data));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}
