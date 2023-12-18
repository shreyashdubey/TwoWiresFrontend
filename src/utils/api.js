import axios from "axios";
const isDev = false
const instance = axios.create({
    baseURL: process.env.PUBLIC_URLREACT_APP_BASE_URL ,

})
instance.interceptors.response.use(function(response){return response?.data}, function(error) {
    return Promise.reject(error);
  })

instance.defaults.headers.common['Authorization'] = 'key '+localStorage.getItem('ACCESS_TOKEN');
console.log('token', 'key '+localStorage.getItem('ACCESS_TOKEN'))
export default instance