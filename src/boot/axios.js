import axios from 'axios'
import {decorateLogoutWhenExpiredInterceptor} from '../utils/axios'

decorateLogoutWhenExpiredInterceptor(axios)


const token = localStorage.getItem('user-token');

export default async ({Vue}) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$axios.defaults.baseURL = process.env.API_URL
  Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/json'
  Vue.prototype.$axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'x-access-token';
  Vue.prototype.$axios.defaults.headers.common['Access-Control-Request-Headers'] = 'x-access-token';
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['x-access-token'] = token
  }
}

