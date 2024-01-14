import axios from "axios";
import { ACCESS_TOKEN, INVALID_TOKEN_STATUS_CODE } from "./siteConstants";
import { removeAccessToken } from "./helper";
const isDev = false
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,

})
instance.interceptors.response.use(function (response) { return response?.data }, function (error) {
  const staus = error.response.status;
  if (staus === INVALID_TOKEN_STATUS_CODE) {
    removeAccessToken()
    window.location.href = '/login';
  }
  return Promise.reject(error);
})

instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'key ' + localStorage.getItem(ACCESS_TOKEN);
  console.log('token', 'key ' + localStorage.getItem(ACCESS_TOKEN));
  return config;
});

export default instance