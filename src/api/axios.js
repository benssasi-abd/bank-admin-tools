'use strict';
import axios, { AxiosError } from 'axios';
import CONFIG from './../app/apiConfig';
import { AuthTokenError } from '../error/AuthTokenError';
import { isValidToken, setSession, destroySession, clearLocalStorage, clearSession, getSession } from '../utils/jwt';
import { useRouter } from 'next/router';
// public urls
import { signIn } from "./endPoints";


const { API_BASE_URL, PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET, PUBLIC_GRANT_TYPE } = CONFIG;
const baseURL = `${API_BASE_URL}`;
const client_id = `${PUBLIC_CLIENT_ID}`;
const client_secret = `${PUBLIC_CLIENT_SECRET}`;
const grant_type = `${PUBLIC_GRANT_TYPE}`;


const publicUrls = `${baseURL}${signIn()}`;



const onFailure = (err) => {
  return {
    err,
  };
};


const onSuccess = (token) => {
  return {
    err,
  };
};


    
const signOut = () => {
  //  router.push('/');
  // push('/');
    clearSession('wtladminaccess_token:session');
    clearSession('wtladminaccess_refresh:session');
  setSession(null);
  destroySession();
};

export function getAPIClient() {
  
console.log('getAPIClient');
  let accessToken  = getSession('wtladminaccess_token:session');
  let refreshToken = getSession('wtladminaccess_refresh:session');

  let isRefreshing = false;


  const api = axios.create({
    baseURL: API_BASE_URL,
    // headers: {
    //   'Content-type': 'application/json',
    //   // 'Access-Control-Allow-Origin': '*',
    //   // 'Access-Control-Allow-Headers': 'origin, x-requested-with, content-type',
    //   // 'Access-Control-Allow-Methods': 'PUT, GET, HEAD, POST, DELETE, OPTIONS',
    //   // 'Access-Control-Allow-Credentials': 'true',
    //   // 'Access-Control-Allow-Origin' : 'https://ihold-admin-ten.vercel.app'
      
    //   // 'Authorization': `Bearer ${accessToken?.accessToken}`,
    // },
  });

  

  // 🚀 INTERCEPTOR OF DATA COMING FROM THE API 🚀
  api.interceptors.response.use(
    (response) => {
      // If all goes well.
      return response;
    },

    (error) => {
      // Save the request that gave error

      // 400 - Bad Request
      if (error.response.status === 400 || error.response.status === 401) {
        // Check if it is invalid token, if you are going to refresh
        if (error.response.data.code === 'token_not_valid') {
          if (!isRefreshing) {
              isRefreshing = true;

            return api
              .post(`/oauth/tokens/${client_id}`, { refreshToken }) // -> refresh token 🚀
              .then((res) => {
                console.log(res.data.access, 'res.data.access');
                setSession('@wtladminaccess_token:session', res.data.access);
                 onSuccess(res.data.access);
              })
              .catch((err) => {
                onFailure(err);

                signOut();
                reject(new Error(err));

                process.browser
                  ? signOut() // logout user signOut()
                  : Promise.reject(new AuthTokenError());
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          // Add requests to the queue as soon as the refresh is performed
          // they get called.
          return new Promise((resolve, reject) => {
            // failedRequestsQueue.push({
            //   onSuccess: (token) => {
            //     originalRequest.headers.Authorization = `Bearer ${token}`;
            //     console.log(token, 'token');
            //     resolve(api(originalRequest));
            //   },
            //   onFailure: (err) => {
            //     reject(err);
            //   },
            // });
          });
        }
      }
      // 400 - Bad Request
      if (error.response.status === 400) {
        // clearLocalStorage();
        signOut();
          process.browser ? signOut() : Promise.reject(error);
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        // clearLocalStorage();
         //signOut();
        return Promise.reject(error);
      }

      // Error Request
      if (
        [
          403,
          // 404, 405, 408, 428, 500, 502
        ].includes(error.response.status)
      ) {
        // clearLocalStorage();
        process.browser
          ? signOut() // logout user signOut()
          : Promise.reject(new AuthTokenError());
      }

      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    return config;
  });

  

  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  return api;
};


