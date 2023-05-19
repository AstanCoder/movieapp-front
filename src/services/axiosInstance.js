import { Axios } from "axios";
import { getCookie } from "./cookies";
const token = getCookie("token");

const instance = new Axios({
    baseURL: "http://localhost:3000"
});

instance.request({
  headers: {
    "auth-token": token,
  },
});

export default instance;
