import instance from "./axiosInstance";
import { getCookie } from "./cookies";

const listMovies = async ({ queryKey }) => {
  const [_, page, perPage] = queryKey;
  return instance
    .get(`/movies/list?page=${page}&limit=${perPage}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => JSON.parse(data.data));
};
const createMovie = async (movie) => {
  return instance
    .post("/movies/new", JSON.stringify(movie), {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
const deleteMovie = async (id) => {
  return instance
    .delete(`/movies/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => data);
};
const uploadMovie = async (formData) => {
  const request = {
    method: "POST",
    headers: { "auth-token": getCookie("token") },
    body: formData,
  };
  return await fetch(
    "http://yml-live.com/movies/google/video/upload",
    request
  ).then((data) => data.json());
};

const listUsers = async ({ queryKey }) => {
  const [_, page, perPage] = queryKey;
  return instance
    .get(`/user/list?page=${page}&limit=${perPage}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => JSON.parse(data.data));
};
const createUsers = async (user) => {
  return instance.post("/auth/register", JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getCookie("token"),
    },
  });
};
const deleteUsers = async (id) => {
  return instance
    .delete(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => data);
};
const listGenres = async ({ queryKey }) => {
  const [_, page, perPage] = queryKey;

  return instance
    .get(`/movies/genres?page=${page}&limit=${perPage}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => JSON.parse(data.data));
};
const createGenres = async (genre_name) => {
  return instance.post(
    "/movies/genres/new",
    JSON.stringify({ genre: genre_name }),
    {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    }
  );
};
const deleteGenres = async (id) => {
  return instance
    .delete(`/movies/genres/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getCookie("token"),
      },
    })
    .then((data) => data);
};

export const services = {
  listMovies,
  createMovie,
  uploadMovie,
  listGenres,
  listUsers,
  createGenres,
  createUsers,
  deleteGenres,
  deleteMovie,
  deleteUsers,
};
