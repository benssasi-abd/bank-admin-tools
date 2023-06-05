import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
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
const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  user: userReducer,
  bank: persistReducer(bankPersistConfig, bankReducer),
  tenant: tenantReducer,
  file: fileReducer,
  style: styleReducer,
  admin: persistReducer(adminPersistConfig, adminReducer),
  product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
