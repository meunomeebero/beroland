import { Avatar, Box, Text } from "@chakra-ui/react";
import { Link } from "../../atoms/link";

export function AvatarDeveloper({ name, image, link, description }) {

  return (
    <Box display="flex" flexDir="column" alignItems="center" maxW="130px">
      <Link target="_blank" href={link}>
        <Avatar
          w="130px"
          h="130px"
          bg="#000"
          name={name}
          src={image}
          border="2px solid #7B68EE"
        />
        <Text fontSize="sm" mt="2" textAlign="center">{description}</Text>
      </Link>
    </Box>
  )
}
