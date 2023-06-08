import axios from "axios";
import { toast } from "react-toastify";

import logger from "./logger";

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  console.log("pass")
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;


  if (!expectedError) {

    logger.log(error);

    if (!error.name === "CanceledError") {
      toast.error('An unexpected error occurred..!!!')
    }
  }

  return Promise.reject(error);
});

const obj = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
  patch: axios.patch,
  cancelToken: axios.CancelToken,
  cancelError: axios.isCancel,
  setJwt,
};
export default obj;
