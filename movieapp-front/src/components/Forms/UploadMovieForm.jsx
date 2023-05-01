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
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { services } from "../../services/services";
import MoviesForm from "./MoviesForm";
import { enqueueSnackbar } from "notistack";

const defaultValues = {
  files: "",
};

function UploadMovieForm({ isOpen, onOpen, onClose }) {
  const [uploadedData, setUploadedData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const {
    isOpen: detailsOpen,
    onOpen: openDetails,
    onClose: closeDetails,
  } = useDisclosure();

  const handleCreate = async (values) => {
    let formData = new FormData();
    formData.append("file", values.files[0]);
    setIsUploading(true);

    const res = await services.uploadMovie(formData);
    
    if (res.message) {
      enqueueSnackbar("Se ha subido el archivo con exito", {
        persist: false,
        variant: "success",
      });
    } else {
      return enqueueSnackbar("Ha ocurrido un error al subir el archivo", {
        persist: false,
        variant: "error",
      });
    }
    setUploadedData({
      video: res.url,
      remote_filename: res.remote_name,
    });

    setIsUploading(false);
    openDetails();
    
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <MoviesForm
        isOpen={detailsOpen}
        onClose={closeDetails}
        onOpen={openDetails}
        uploadedData={uploadedData}
        closeUploadForm={onClose}
      />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Subir Pelicula</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <FormControl>
              <Stack direction="column">
                <Stack direction="column" mb={2}>
                  <Text as="p">Archivo de video</Text>
                  <Input
                    accept="video/*"
                    type="file"
                    name="files"
                    {...register("files")}
                    multiple={false}
                  ></Input>
                </Stack>
              </Stack>
              <Stack mt={2}>
                <Button
                  rounded={20}
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                >
                  Subir
                </Button>

                {isUploading && <Spinner />}
              </Stack>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UploadMovieForm;
