import axios from "axios";
import { getCookie, setCookie } from "./cookies";

const login = async ({ email, password }) => {
  const {data} = await axios.post("http://yml-live.com/auth/signin", {email, password})

  return data
};

export const auth = {
  login,
};
