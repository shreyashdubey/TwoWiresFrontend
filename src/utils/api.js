import axios from "axios";
const isDev = true
const instance = axios.create({
    baseURL: (isDev ? "http://localhost:3001/" : "https://troubled-elk-glasses.cyclic.app") ,

})
instance.interceptors.response.use(function(response){return response?.data}, function(error) {
    return Promise.reject(error);
  })

instance.defaults.headers.common['Authorization'] = 'key '+localStorage.getItem('ACCESS_TOKEN');
console.log('token', 'key '+localStorage.getItem('ACCESS_TOKEN'))
export default instance