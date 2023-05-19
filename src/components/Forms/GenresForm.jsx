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
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "react-query";

const defaultValues = {
  genre: "",
};

function GenresForm({ isOpen, onOpen, onClose,  refetch }) {
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: defaultValues,
  });
  const queryClient = useQueryClient()

  const handleCreate = async (values) => {
    await services
      .createGenres(values.genre)
      .then((data) =>
        {
          queryClient.invalidateQueries("genres")
          enqueueSnackbar("Se ha creado el genero con exito", {
          persist: false,
          variant: "success",
        })
        
        onClose()
      }
      )
      .catch((err) => {
        return enqueueSnackbar("Ha ocurrido un error al crear el genero", {
          persist: false,
          variant: "error",
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Genero</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <FormControl>
              <Stack direction="column">
                <Stack direction="column">
                  <Text as="p">Nombre de Genero</Text>
                  <Input
                    type="text"
                    name="genre"
                    {...register("genre")}
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

export default GenresForm;
