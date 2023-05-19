import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { services } from "../../services/services";
import { formatDate } from "../../utils/formatDate";

function RefferalsDialog({ isOpen, onClose, ref_id, ref_name }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (ref_id) {
      services.getRefferals(ref_id).then((data) => {
        console.log(data.data);
        setData(JSON.parse(data.data));
      });
    }
  }, [ref_id, setData]);

  const options = data?.results;

  const handleClose = () => {
    setData(null);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
        <ModalContent>
          <ModalHeader>Referidos de {ref_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer mt={2}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Nombre</Th>
                    <Th>Fecha de creado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!data ? (
                    <Tr>
                      <Td>
                        <Spinner />
                      </Td>
                    </Tr>
                  ) : (
                    ""
                  )}
                  {options?.map((option) => {
                    return (
                      <Tr key={option?.id}>
                        <Td>{option?.id}</Td>
                        <Td>{option?.name}</Td>
                        <Td>{formatDate(option?.createdAt)}</Td>
                      </Tr>
                    );
                  })}

                  {data?.message ? (
                    <Tr>
                      <Td>{data?.message}</Td>
                    </Tr>
                  ) : (
                    ""
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" color="red" onClick={handleClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RefferalsDialog;
