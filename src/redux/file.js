import { createSlice } from '@reduxjs/toolkit';
import { Alert } from '@mui/material';




import { api } from './../api';

//
import { dispatch } from './store';

// ---------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  file: null,
};

const slice = createSlice({
  name: 'file',
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

    // GET LIST FILE
    getfile(state, action) {
      state.isLoading = false;
      state.file = action.payload;
    },

    // SET FILE
    createFileSuccess(state, action) {
      state.isLoading = false;
      state.file = action.payload;
      console.log(state.file, 'actionaction');
    },

    // GET COLUMN
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

export function createFile(payload) {

  return async () => {
    dispatch(slice.actions.startLoading());
      try {
        console.log(payload, 'payload');
        
      let fileInfo = new FormData();
        fileInfo.append('file', payload);
        const {data} = await api.post('/users/file', fileInfo);
          console.log(data, 'response');
        dispatch(slice.actions.createFileSuccess(data.id));
    } catch (error) {
      console.log(error, 'error');
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getColumn(columnId) {
   
  return (dispatch) => {
    dispatch(slice.actions.getColumnSuccess(columnId));
  };
}