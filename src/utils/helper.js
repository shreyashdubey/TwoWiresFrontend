import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "./siteConstants";

export function getDecodedUserData() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const decodedToken = jwtDecode(accessToken);
  return decodedToken.user;
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
