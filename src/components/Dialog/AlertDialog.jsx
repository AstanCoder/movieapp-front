import { AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

function AlertDialog({deleteText, onDelete, isOpen, onClose, id}) {
    const cancelRef = React.useRef()
  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Borrar {deleteText}
            </AlertDialogHeader>

            <AlertDialogBody>
              Esta accion es irreversible seguro deseas borrar este elemento del sistema
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{}} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default AlertDialog