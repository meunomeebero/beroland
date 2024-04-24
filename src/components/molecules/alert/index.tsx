import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  toast,
  useToast,
} from '@chakra-ui/react'
import React, { cloneElement, useCallback } from 'react'

export function Alert({ children, text, title, handler }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [isLoading, setIsLoading] = React.useState(false)
  const toast = useToast();

  const onClick = useCallback(async () => {
    onOpen();
  }, [onOpen, handler])

  const confirmHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await handler();
    } catch (err) {
      toast({ title: 'Sinto muito, mas não deu certo :/', status: 'error' });
    } finally {
      setIsLoading(false);
      onClose();
    }
  }, [handler, onClose, toast]);

  return (
    <>
      {cloneElement(children, { onClick })}
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg="gray.800">
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {text}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button isLoading={isLoading} bg="purple.400" ml={3} onClick={confirmHandler}>
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
