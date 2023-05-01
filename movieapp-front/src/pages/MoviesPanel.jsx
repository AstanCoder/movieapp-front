import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

function MoviesPanel() {
  return (
    <TableContainer mt={2}>
        <Button variant="outline">
            Subir
        </Button>
  <Table variant='simple'>
    <TableCaption>Listado de peliculas en el sistema</TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Nombre</Th>
        <Th>Acciones</Th>
        
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td ><Button>Borrar</Button></Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td >30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td >0.91444</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
  )
}

export default MoviesPanel