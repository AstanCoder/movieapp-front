import {
  Button,
  FormControl,
  IconButton,
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
import { enqueueSnackbar } from "notistack";
import { useQuery, useQueryClient } from "react-query";
import { PanoramaFishEye, Watch } from "@mui/icons-material";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

function UsersForm({ isOpen, onOpen, onClose, refetch }) {
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: defaultValues,
  });


  const queryClient = useQueryClient()

  const [see, setSee] = useState(false);

  const handleCreate = async (values) => {
    const res = await services
      .createUsers(values)
      .then((data) => {
        if (data.status !== 200 && data.status !== 202) {
          const message = JSON.parse(data?.data);
          enqueueSnackbar(message.message, {
            variant: "error",
            persist: false,
          });
        } else {
          queryClient.invalidateQueries("users")
          enqueueSnackbar("Se ha creado el usuario con exito", {
            persist: false,
            variant: "success",
          });

          onClose();
        }
      })
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
                  <Stack direction="row">
                    <Input
                      type={see ? "text":"password"}
                      name="password"
                      {...register("password")}
                    ></Input>
                    <Button
                      onClick={() => {
                        setSee(!see);
                      }}
                    >
                      {!see ? "Ver" : "Ocultar"}
                    </Button>
                  </Stack>
                </Stack>
                <Select
                  placeholder={"Seleccione un rol"}
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
