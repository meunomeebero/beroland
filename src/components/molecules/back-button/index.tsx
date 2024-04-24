import { Box, Icon } from '@chakra-ui/react';
import { Link } from '../../atoms/link';
import { BsArrowLeft } from 'react-icons/bs';

export function BackButton() {
  return (
    <Box position="absolute" top="6" left="6">
      <Link href="/">
        <Icon as={BsArrowLeft} h="6" w="6" color="green.400"/>
      </Link>
    </Box>
  );
}
