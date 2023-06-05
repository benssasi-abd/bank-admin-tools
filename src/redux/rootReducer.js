import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices

import userReducer from './user';
import bankReducer from './bank';
import fileReducer from './file';
import styleReducer from './style';
import adminReducer from './admin';
import tenantReducer from './tenant';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};


const bankPersistConfig = {
  key: 'bank',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};



const adminPersistConfig = {
  key: 'admin',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const stylePersistConfig = {
  key: 'style',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const rootReducer = combineReducers({
  user: userReducer,
  bank: persistReducer(bankPersistConfig, bankReducer),
  tenant: tenantReducer,
  file: fileReducer,
  style: persistReducer(stylePersistConfig, styleReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
});

export { rootPersistConfig, rootReducer };
