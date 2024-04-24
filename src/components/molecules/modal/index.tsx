import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'
import Lottie from 'lottie-react';
import animationData from '../../../../public/static/dimond.json';

export function Modal({ text, isOpen, onClose }) {
  return (
    <CModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent background="gray.800">
        <ModalHeader color="gray.50">🚀 Wow, você descobriu uma gema!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex h="300px" w="200px" align="center" justify="center" ml="auto" mr="auto" pb="20">
            <Lottie animationData={animationData}/>
          </Flex>
        </ModalBody>
      </ModalContent>
    </CModal>
  );
}
