import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import {
  Box,
  Button,
  IconButton,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import AppLayout from "./layouts/AppLayout";
import MoviesPanel from "./pages/MoviesPanel";
import AdminPanel from "./pages/AdminPanel";
import { auth } from "./services/auth";
import Login from "./pages/Login";
import { getCookie } from "./services/cookies";
import { services } from "./services/services";
import { useQuery } from "react-query";
import MoviesForm from "./components/Forms/MoviesForm";
import UploadMovieForm from "./components/Forms/UploadMovieForm";
import GenresForm from "./components/Forms/GenresForm";
import UsersForm from "./components/Forms/UsersForm";
import AlertDialog from "./components/Dialog/AlertDialog";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Peliculas");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [_movies, set_movies] = useState(null);
  const [_genres, set_genres] = useState(null);
  const [_users, set_users] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateValues, setUpdateValues] = useState({})

  useEffect(() => {
    if (getCookie("token")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const {isOpen: openMovieForm, onOpen: onOpenMovieForm, onClose: onCloseMovieForm} = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    data: movies,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["movies", page, perPage], services.listMovies, {
    keepPreviousData: true,
  });

  const {
    data: genres,
    isLoading: loadingGenres,
    isSuccess: successGenres,
    error: errorGenres,
  } = useQuery(["genres", page, perPage], services.listGenres, {
    keepPreviousData: true,
  });

  const {
    data: users,
    isLoading: loadingUsers,
    isSuccess: successUsers,
    error: errorUsers,
  } = useQuery(["users", page, perPage], services.listUsers, {
    keepPreviousData: true,
  });
  useEffect(() => {
    if (isSuccess && movies) {
      console.log(movies);
      let arranged_movies = [];
      movies?.results?.map((movie) => {
        arranged_movies.push({ id: movie.id, name: movie.title });
      });
      set_movies(arranged_movies);
    }
  }, [movies, isLoading, isSuccess, error]);

  useEffect(() => {
    if (successGenres && genres) {
      let arranged_genres = [];
      genres?.results?.map((genre) => {
        arranged_genres.push({
          id: genre._id,
          name: genre.genre,
        });
      });

      set_genres(arranged_genres);
    }
  }, [genres, loadingGenres, successGenres, errorGenres]);

  useEffect(() => {
    if (successUsers && users) {
      let arranged_users = [];
      users?.results?.map((user) => {
        arranged_users.push({
          id: user._id,
          name: user.name,
          role: user.role_name,
        });
      });

      set_users(arranged_users);
    }
  }, [users, loadingUsers, successUsers, errorUsers]);

  console.log(movies);

  const handlePageChange = (selection) => {
    setPage(1);
    setPerPage(10);
    onClose();
    setSelectedPage(selection);
  };

  const onUpdateMovie = (id) => {
    let movie;
    movies?.results?.map((data) => {
      if (data.id === id) {
        movie = data;
      }
    });

    setUpdateValues(movie)
    setIsUpdate(true)
    onOpenMovieForm()

  };

  const onCloseUpdateMovieForm = ()=>{
    setIsUpdate(false)
    setUpdateValues({})
    onCloseMovieForm()
  }

  return (
    <>
    <MoviesForm
    isOpen={openMovieForm}
    isUpdate={isUpdate}
    onClose={onCloseUpdateMovieForm}
    onOpen={onOpenMovieForm}
    updateValues={updateValues}


    />
      <Box backgroundColor="whiteAlpha.100">
        {isAuthenticated ? (
          <AppLayout
            selectedPage={selectedPage}
            setSelectedPage={handlePageChange}
          >
            {selectedPage === "Peliculas" ? (
              <>
                <UploadMovieForm
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
                <AdminPanel
                  key="movies"
                  options={_movies}
                  handleAction={() => {
                    onOpen();
                  }}
                  handleUpdate={onUpdateMovie}
                  title={"Listado de peliculas almacenadas en el sistema"}
                  selectedPage={selectedPage}
                />
              </>
            ) : selectedPage === "Generos" ? (
              <>
                <GenresForm isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                <AdminPanel
                  key="genres"
                  options={_genres}
                  handleAction={() => {
                    onOpen();
                  }}
                  title={"Listado de generos almacenadas en el sistema"}
                  selectedPage={selectedPage}
                />
              </>
            ) : selectedPage === "Usuarios" ? (
              <>
                <UsersForm isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                <AdminPanel
                  key="users"
                  options={_users}
                  handleAction={() => {
                    onOpen();
                  }}
                  title={"Listado de usuarios almacenadas en el sistema"}
                  selectedPage={selectedPage}
                />
              </>
            ) : (
              "ERROR"
            )}
            <Stack direction="column">
              <Text>Paginación</Text>
              <Stack direction="row" alignItems="center">
                <IconButton
                  icon={<ArrowBackIcon />}
                  onClick={() => {
                    page > 1 ? setPage(page - 1) : "";
                  }}
                ></IconButton>
                <Text>{page}</Text>
                <IconButton
                  icon={<ArrowForwardIcon />}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                ></IconButton>
              </Stack>
            </Stack>
          </AppLayout>
        ) : (
          <Login />
        )}
      </Box>
    </>
  );
}

export default App;
