import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:3001",

})
instance.interceptors.response.use(function(response){return response?.data}, function(error) {
    return Promise.reject(error);
  })

instance.defaults.headers.common['Authorization'] = 'key '+localStorage.getItem('ACCESS_TOKEN');
console.log('token', 'key '+localStorage.getItem('ACCESS_TOKEN'))
export default instance