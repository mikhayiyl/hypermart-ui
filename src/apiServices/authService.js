import jwtDecode from "jwt-decode";
import http from "./httpService";
const api = "/auth";

export async function Login(user) {
  const { data: jwt } = await http.post(api, user);
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}

export function currentUser() {
  try {
    return jwtDecode(getJwt());
  } catch (error) {
    return null;
  }
}

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

const obj = {
  Login,
  getJwt,
  currentUser,
  logout,
};

export default obj; 