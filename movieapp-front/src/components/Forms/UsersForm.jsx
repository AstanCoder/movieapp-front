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

const defaultValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

function UsersForm({ isOpen, onOpen, onClose }) {
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const handleCreate = async (values) => {
    const res = await services
      .createUsers(values)
      .then((data) =>
       { enqueueSnackbar("Se ha creado el usuario con exito", {
          persist: false,
          variant: "success",
        })
        onClose()
      }
      )
      .catch((err) => {
        return enqueueSnackbar("Ha ocurrido un error al crear el usuario", {
          persist: false,
          variant: "error",
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Usuarios</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <FormControl>
              <Stack direction="column">
                <Stack direction="column">
                  <Text as="p">Nombre de usuario</Text>
                  <Input type="text" name="name" {...register("name")}></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Correo Electronico</Text>
                  <Input
                    type="email"
                    name="email"
                    {...register("email")}
                  ></Input>
                </Stack>
                <Stack direction="column">
                  <Text as="p">Contraseña</Text>
                  <Input
                    type="password"
                    name="password"
                    {...register("password")}
                  ></Input>
                </Stack>
                <Select
                  placeholder={"Seleccione uno"}
                  name="role"
                  {...register("role")}
                >
                  <option value={"moderator"}>Moderador</option>
                  <option value={"user"}>Usuario</option>
                </Select>
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

export default UsersForm;
