import instance from "./axiosInstance";
import { getCookie, setCookie } from "./cookies";

const login = async ({ email, password }) => {
  return await instance
    .post("/auth/signin", JSON.stringify({ email, password }), {
      headers: { "Content-type": "application/json" },
    })
    .then((data) => {
      const token = JSON.parse(data.data).token;

      setCookie({ name: "token", value: token });

      return token
    });
};

export const auth = {
  login,
};
