import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession, destroySession } from '../utils/jwt';

// import  {api} from './../services/api'
import { api } from './../api';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  style: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user,style } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      style,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  SETUSER: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),

  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};


function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('wtladminaccess_token:session');

        const refreshToken = window.localStorage.getItem('wtladminaccess_refresh:session');


        

        let dataStyle = [];

        if (accessToken && isValidToken(accessToken)) {
          setSession('wtladminaccess_token:session', accessToken);

          setSession('wtladminaccess_refresh:session', refreshToken);

          const { data } = await api.get('/users/me');

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: data,
              style: dataStyle,
            },
          });

          console.log('INITIALIZE', true);
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              style: dataStyle,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            style: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (auth) => {
    const { data } = await api.post('/oauth/tokens', auth);
    const user = null;

    setSession('wtladminaccess_token:session', data.access_token);

    setSession('wtladminaccess_refresh:session', data.refresh_token);

    if (data) {
      user = await api.get('/users/me');
    }

    dispatch({
      type: 'LOGIN',
      payload: {
        user: { ...user.data, role: 'Admin' },
      },
    });
  };

  const getme = async () => {
    const { data } = await api.get('/users/me');
    return data;
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession('wtladminaccess_token:session', null);

    setSession('wtladminaccess_refresh:session', null);

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
