import { Axios } from "axios";
import { getCookie } from "./cookies";
const token = getCookie("token");

const instance = new Axios({
    baseURL: "http://yml-live.com"
});

instance.request({
  headers: {
    "auth-token": token,
  },
});

export default instance;
