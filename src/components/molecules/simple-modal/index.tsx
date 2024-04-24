import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Textarea,
  Avatar,
  useToast,
} from "@chakra-ui/react"
import { useRef, cloneElement, useCallback, useEffect, useState } from "react"
import ResizeTextarea from "react-textarea-autosize";
import { useAuth } from "../../../states/hooks/use-auth";

export function SimpleModal({
  children,
  handler,
  textAreaProps,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const initialRef = useRef();
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const { data } = useAuth();


  const handleOpenModal = useCallback(async () => {
    if (!data) {
      toast({ title: 'Você precisa estar logado para comentar', status: 'error' });
      return;
    }
    onOpen()
  }, [data, onOpen, toast]);

  const handleSubmit = useCallback(async (event) => {
    setIsLoading(true);
    event.preventDefault();
    await handler(event);
    onClose();
    setIsLoading(false);
  }, [onClose, handler]);

  return (
    <>
      { cloneElement(children, { onClick: handleOpenModal }) }
      <Modal
        isCentered={true}
        blockScrollOnMount
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent bg="gray.800" mx="4">
          <form onSubmit={handleSubmit}>
            <ModalHeader color="gray.50">
              <ModalCloseButton  />
            </ModalHeader>
            <ModalBody pb={6} mt="2">
              <FormControl display="flex" flexDirection="row">
                <Avatar name={data?.user?.name} src={data?.user?.image} />
                <Textarea
                  as={ResizeTextarea}
                  minRows={1}
                  maxRows={40}
                  maxH="50vh"
                  variant="filled"
                  bg="gray.800"
                  focusBorderColor="gray.800"
                  resize="none"
                  ref={textAreaRef}
                  size="lg"
                  name="content"
                  _hover={{ bg: "gray.800" }}
                  {...textAreaProps}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                bg="gray.600"
                mr={3}
                type="submit"
                _hover={{ bgColor: "purple.400" }}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
