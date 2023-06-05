import CONFIG from './../app/apiConfig';

const { API_BASE_URL, API_VERSION } = CONFIG;
const baseURL = `${API_BASE_URL}${API_VERSION}`;

import Api from './../api';

export { Api, baseURL };
