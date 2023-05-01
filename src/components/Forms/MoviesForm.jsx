import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { services } from "../../services/services";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { Spinner } from '@chakra-ui/react'

const defaultValues = {
  originalTitle: "",
  backdropPath: "",
  originalLanguage: "",
  overview: "",
  posterPath: "",
  releaseDate: "",
  title: "",
  video: "",
  remote_filename: "",
  genre_id: "",
};

function MoviesForm({
  isOpen,
  onOpen,
  onClose,
  uploadedData,
  closeUploadForm,
}) {
  const { data, isLoading, isSuccess, isError } = useQuery(
    ["genres"],
    services.listGenres,
    {
      keepPreviousData: true,
    }
  );

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(uploadedData);
    if (uploadedData) {
      setValue("video", uploadedData.video);
      setValue("remote_filename", uploadedData.remote_filename);
    }
  }, [uploadedData, setValue]);

  const handleCreate = async (values) => {
   return await services
      .createMovie(values)
      .then((data) => {
        enqueueSnackbar("Pelicula creada con exito", {
          persist: false,
          variant: "success",
        });
        console.log(data)
        onClose();
        window.location.reload()
        closeUploadForm()
      })
      .catch((err) =>
        enqueueSnackbar("Ha ocurrido un error al crear la pelicula", {
          persist: false,
          variant: "error",
        })
      );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Pelicula</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <FormControl>
              <Stack direction="column">
                <Stack direction="column">
                  <Text as="p">Titulo Original</Text>
                  <Input
                    type="text"
                    name="originalTitle"
                    {...register("originalTitle")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Enlace de la imagen de la pelicula</Text>
                  <Input
                    type="text"
                    name="backdropPath"
                    {...register("backdropPath")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Lenguage Original</Text>
                  <Input
                    type="text"
                    name="originalLanguage"
                    {...register("originalLanguage")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Sinopsis</Text>
                  <Textarea
                    type="text"
                    name="overview"
                    {...register("overview")}
                  ></Textarea>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Fecha de estreno</Text>

                  <Input
                    defaultValue="dd-mm-yy"
                    type="text"
                    name="releaseDate"
                    {...register("releaseDate")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Titulo</Text>
                  <Input
                    type="text"
                    name="title"
                    {...register("title")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Enlace de la imagen del poster</Text>
                  <Input
                    type="text"
                    name="posterPath"
                    {...register("posterPath")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Enlace del video</Text>
                  <Input
                    type="text"
                    name="video"
                    {...register("video")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Nombre remoto del archivo</Text>
                  <Input
                    type="text"
                    name="remote_filename"
                    {...register("remote_filename")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Genero</Text>
                  <Select
                    placeholder={"Seleccione uno"}
                    name="genre_id"
                    {...register("genre_id")}
                  >
                    {isSuccess
                      ? data.results.map((genre) => (
                          <option key={genre._id} value={genre._id}>
                            {genre.genre}
                          </option>
                        ))
                      : <option value={null}>No hay generos en el sistema</option>}
                  </Select>
                </Stack>
              </Stack>
              <Stack mt={2}>
                <Button
                  rounded={20}
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                >
                  Crear
                </Button>
              </Stack>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MoviesForm;
