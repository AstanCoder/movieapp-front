import {
  Button,
  FormControl,
  Image,
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
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { services } from "../../services/services";
import { useSnackbar } from "notistack";
import { useQuery, useQueryClient } from "react-query";
import { Spinner } from "@chakra-ui/react";
import { getBase64 } from "../../utils/getBase64";

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
  isUpdate,
  updateValues,
  refetch,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [updateImage, setUpdateImage] = useState(false);
  const { data, isLoading, isSuccess, isError } = useQuery(
    ["genres"],
    services.listGenres,
    {
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient()

  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: defaultValues,
  });

  const image_file = watch("backdropPath");

  const selectedImage = image_file[0];

  useEffect(() => {
    if (selectedImage) {
      console.log(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(uploadedData);
    if (uploadedData && !isUpdate) {
      setValue("video", uploadedData.video);
      setValue("remote_filename", uploadedData.remote_filename);
    }
  }, [uploadedData, setValue, isUpdate]);

  useEffect(() => {
    if (isUpdate) {
      let _updatedValues = { ...updateValues };
      delete _updatedValues.backdropPath;
      let keys = Object.keys(_updatedValues);
      console.log(keys);
      console.log(isUpdate);
      console.log(updateValues);
      for (let i = 0; i < keys.length; i++) {
        setValue(`${keys[i]}`, _updatedValues[`${keys[i]}`]);
      }
      if (!imageUrl) {
        setValue("backdropPath", [""]);
        setImageUrl(updateValues.backdropPath);
      }
    }
  }, [isUpdate, updateValues, setValue]);

  const handleCreate = async (values) => {
    if (!isUpdate) {
      const backdrop = values.backdropPath[0];

      getBase64(backdrop).then(async (res) => {
        values.backdropPath = res;
        values.images = true;
        console.log(values);

        return await services
          .createMovie(values)
          .then((data) => {
            queryClient.invalidateQueries("movies")
            enqueueSnackbar("Pelicula creada con exito", {
              persist: false,
              variant: "success",
            });
            console.log(data);
            onClose();

            closeUploadForm();
          })
          .catch((err) =>
            enqueueSnackbar("Ha ocurrido un error al crear la pelicula", {
              persist: false,
              variant: "error",
            })
          );
      });
    } else {
      values.id = updateValues.id;
      if (imageUrl !== updateValues.backdropPath) {
        const backdrop = values.backdropPath[0]
        
        getBase64(backdrop).then(async (res) => {
          values.backdropPath = res;
          values.images = true;
          values.update_image = true;
          console.log(values);
          return await services
            .updateMovie(values)
            .then((data) => {
              queryClient.invalidateQueries("movies")
              enqueueSnackbar("Pelicula actualizada con exito", {
                persist: false,
                variant: "success",
              });
              console.log(data);

              return onClose();
            })
            .catch((err) =>
              enqueueSnackbar(
                "Ha ocurrido un error al actualizar la pelicula",
                {
                  persist: false,
                  variant: "error",
                }
              )
            );
        });
      } else {
        values.update_image = false
        values.backdropPath = updateValues.backdropPath
        return await services
          .updateMovie(values)
          .then((data) => {
            queryClient.invalidateQueries("movies")
            enqueueSnackbar("Pelicula actualizada con exito", {
              persist: false,
              variant: "success",
            });
            console.log(data);
            onClose();

            return closeUploadForm();
          })
          .catch((err) =>
            enqueueSnackbar("Ha ocurrido un error al actualizar la pelicula", {
              persist: false,
              variant: "error",
            })
          );
      }
    }
  };
  const handleClose = () => {
    setImageUrl("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="full">
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
                  <Text as="p">Imagen de la pelicula</Text>
                  <Input
                    type={"file"}
                    multiple={false}
                    name="backdropPath"
                    {...register("backdropPath")}
                  ></Input>
                  <Image
                    display={imageUrl ? "unset" : "none"}
                    boxSize="150px"
                    objectFit="cover"
                    src={imageUrl}
                    alt="imagen seleccionada"
                  />
                </Stack>
                <Stack direction="column">
                  <Text as="p">Lenguage Original</Text>
                  <Input
                    type="text"
                    accept="image/*"
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
                  <Text as="p">Genero</Text>
                  <Select
                    placeholder={"Seleccione uno"}
                    name="genre_id"
                    {...register("genre_id")}
                  >
                    {isSuccess ? (
                      data?.results?.map((genre) => (
                        <option key={genre._id} value={genre._id}>
                          {genre.genre}
                        </option>
                      ))
                    ) : (
                      <option value={null}>No hay generos en el sistema</option>
                    )}
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
                  {isUpdate ? "Actualizar" : "Crear"}
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
