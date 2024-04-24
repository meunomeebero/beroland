import { Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"

type AlertModalProps = {
  title: string;
  description: string;
};

export function AlertModal({ title, description }: AlertModalProps) {
  const Overlay = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const { onClose, isOpen, onOpen } = useDisclosure()

  useEffect(() => {
    onOpen();
  }, [onOpen])

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <Overlay/>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
