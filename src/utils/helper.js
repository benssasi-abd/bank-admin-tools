// ----------------------------------------------------------------------
import CONFIG from './../app/apiConfig';
import { useRouter } from 'next/router';

const { API_BASE_URL } = CONFIG;
const baseURL = `${API_BASE_URL}`;


// export default function user_img(baseURL, name) {
//   return `http://${baseURL}/api/userimage/${name}/0`;
// }

export default function user_img(name) {
  return `${baseURL}/userimage/${name}/0`;
}


