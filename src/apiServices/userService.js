import http from "./httpService";
const api = "/users";

//register user

export async function registerUser(user) {
  const { headers } = await http.post(api, user);
  localStorage.setItem("token", headers["x-auth-token"]);
}
//all users

export function getUsers(token) {
  return http.get(api, token);
}
//specific user

export function getUser(id, token) {
  return http.get(api + "/" + id, token);
}
//update user

export function updateUser(user) {

  //update user
  if (user._id) {
    const obj = { ...user };
    delete obj._id;
    return http.put(api + `/${user._id}`, obj);
  } else {
    // new user -> admin registration
    return http.post(api, user);
  }
}

//delete user
export function deleteUser(id) {
  return http.delete(api + "/" + id);
}

