import { jwtDecode } from "jwt-decode";

export function getDecodedUserData(){
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const decodedToken = jwtDecode(accessToken);
    return decodedToken.user;
}