import jwtDecode from 'jwt-decode';
//
// import axios from './axios';

import { api } from './../api';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

 const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp * 216000 - currentTime;
  console.log(timeLeft);
  expiredTimer = window.setTimeout(() => {
    // You can do what ever you want here, like show a notification
  }, timeLeft);
};

const setSession = (name,accessToken) => {
  if (accessToken) {
    localStorage.setItem(name, accessToken);
    if (name !== 'wtladminaccess_refresh:session') {
       api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      // This function below will handle when token is expired
      const { exp } = jwtDecode(accessToken);
      handleTokenExpired(exp);

    }
  

  } else {
    localStorage.removeItem(name);
    delete api.defaults.headers.common.Authorization;
  }
};




const getSession = (key) => {
   if (typeof window !== 'undefined') {
     return (window.localStorage.getItem(key));
   }
};

const  destroySession  = (accessToken=null) => {
  
    localStorage.removeItem('wtladminaccess_token:session');
    localStorage.removeItem('wtladminaccess_refresh:session');
    localStorage.removeItem('two-factor');
    delete api.defaults.headers.common.Authorization;

};


 function clearLocalStorage() {
  return window.localStorage.clear();
}



 function removeItemLocalStorage(key) {
  return window.localStorage.removeItem(key);
}

 function getLocalStorage(key) {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key) || '');
  }
}


function clearSession(name) {
  var promise = new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(name);
      resolve();
    } catch (error) {
      console.log('remove session error', error);
    }
  });

  return promise;
}

export { isValidToken, setSession, destroySession, clearLocalStorage, getSession, clearSession, getLocalStorage };
