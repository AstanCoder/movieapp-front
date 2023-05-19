import axios from "axios";
import { getCookie, setCookie } from "./cookies";

const login = async ({ email, password }) => {
  const {data} = await axios.post("http://localhost:3000/auth/signin", {email, password})

  return data
};

export const auth = {
  login,
};
