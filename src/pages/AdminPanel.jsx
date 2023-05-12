import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { services } from "../services/services";
import AlertDialog from "../components/Dialog/AlertDialog";
import { enqueueSnackbar } from "notistack";
import { Edit, RemoveRedEye } from "@mui/icons-material";

function AdminPanel({
  title,
  options,
  handleAction,
  handleUpdate,
  selectedPage,
}) {
  const [deleteId, setDeleteId] = useState(null);
  const [deleteText, setDeleteText] = useState("");
  const {
    isOpen: alertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const onDeleteMovie = (id) => {
    setDeleteId(id);
    setDeleteText("Pelicula");
    openAlert();
    console.log(id);
  };

  const onDeleteGenre = (id) => {
    setDeleteId(id);
    setDeleteText("Genero");
    openAlert();
  };

  const onDeleteUser = (id) => {
    setDeleteId(id);
    setDeleteText("Usuario");
    openAlert();
  };

  const handleDeleteMovie = async (id) => {
    const res = await services.deleteMovie(id);

    if (res.status === 200 || res.status === 202 || res.status === 204) {
      enqueueSnackbar("Se Ha borrado el elemento con exito", {
        persist: false,
        variant: "success",
      });
    } else {
      return enqueueSnackbar("Ha ocurrido un error al borrar el elemento", {
        persist: false,
        variant: "error",
      });
    }

    console.log(res);
    closeAlert();
    setDeleteId(null);
    setDeleteText("");
    window.location.reload();
  };

  const handleDeleteGenre = async (id) => {
    const res = await services.deleteGenres(id);
    console.log(res);
    if (res.status === 200 || res.status === 202 || res.status === 204) {
      enqueueSnackbar("Se Ha borrado el elemento con exito", {
        persist: false,
        variant: "success",
      });
    } else {
      return enqueueSnackbar("Ha ocurrido un error al borrar el elemento", {
        persist: false,
        variant: "error",
      });
    }
    closeAlert();
    setDeleteId(null);
    setDeleteText("");
  };

  const handleDeleteUser = async (id) => {
    const res = await services.deleteUsers(id);
    if (res.status === 200 || res.status === 202 || res.status === 204) {
      enqueueSnackbar("Se Ha borrado el elemento con exito", {
        persist: false,
        variant: "success",
      });
    } else {
      return enqueueSnackbar("Ha ocurrido un error al borrar el elemento", {
        persist: false,
        variant: "error",
      });
    }
    closeAlert();
    setDeleteId(null);
    setDeleteText("");
  };

  const handleDelete = () => {
    if (selectedPage === "Peliculas") {
      handleDeleteMovie(deleteId);
    }
    if (selectedPage === "Generos") {
      handleDeleteGenre(deleteId);
    }
    if (selectedPage === "Usuarios") {
      handleDeleteUser(deleteId);
    }
  };

  return (
    <>
      <Modal isOpen={alertOpen} onClose={closeAlert}>
        <ModalContent>
          <ModalHeader>Advertencia</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> Seguro que deseas Borrar este elemento</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" color="red" onClick={handleDelete}>
              Borrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TableContainer mt={2}>
        <Button variant="outline" onClick={handleAction}>
          Crear
        </Button>
        <Table variant="simple">
          <TableCaption>{title}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              {selectedPage === "Usuarios" ? <Th>Rol</Th> : ""}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {options?.map((option) => {
              return (
                <Tr key={option.id}>
                  <Td>{option.id}</Td>
                  <Td>{option.name}</Td>
                  {selectedPage === "Usuarios" ? <Td>{option.role}</Td> : ""}
                  <Td key={option.id} p={1}>
                    <IconButton
                      key={option.id}
                      rounded="3xl"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        if (selectedPage === "Peliculas") {
                          onDeleteMovie(option.id);
                        }
                        if (selectedPage === "Generos") {
                          onDeleteGenre(option.id);
                        }
                        if (selectedPage === "Usuarios") {
                          onDeleteUser(option.id);
                        }
                      }}
                    ></IconButton>
                  </Td>
                  {selectedPage === "Peliculas" && (
                    <Td>
                      <IconButton icon={<Edit />} onClick={()=>handleUpdate(option.id)}></IconButton>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminPanel;
