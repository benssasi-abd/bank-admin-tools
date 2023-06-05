// ----------------------------------------------------------------------
import CONFIG from './../app/apiConfig';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

const { API_BASE_URL } = CONFIG;
const baseURL = `${API_BASE_URL}`;

export default function user_theme(baseURL) {
  console.log('response.data axios');
  let c = axios.get(`http://${baseURL}/api/filehost/`).then((response) => {
    // console.log(response.data.asset.theme_colors, 'response.data');
    if (response.data) {
          Cookies.set('themeColorPresets', (response.data && response.data.asset.theme_colors) || 'default', {
            expires: 3,
          });
    }

  });
}
