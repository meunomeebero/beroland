import { Avatar, Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useAuth } from "../../../states/hooks/use-auth";
import { ElementContainer } from "../../atoms/element-container";
import { Alert } from "../../molecules/alert";
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from "axios";
import useSessionStorage from "../../../states/hooks/use-session-storage";

export type CommentDataProps = {
  id: number;
  profileUserId: number;
  createdBy: {
    id: number;
    name: string;
    image: string;
  };
  content: string;
}

type CommentProps = {
  handler?: () => void;
  containerProps?: any;
  data: CommentDataProps;
};

export function Comment({
  handler,
  containerProps,
  data: { content, id, profileUserId, createdBy }
}: CommentProps) {
  const session = useAuth();
  const toast = useToast();
  const me = useMemo(() => session?.data?.user, [session]);
  const token = useSessionStorage('token', me)

  const handleDeleteComment = useCallback(async () => {
    await axios.delete(`/api/v1/users/profiles/comments`, {
      params: { commentId: id, token }
    });
    handler();
    toast({ title: 'Deletando comentário...', status: 'info', variant: 'subtle' });
  }, [toast, id, token, handler]);

  const userHasPermissions = useMemo(() =>
  me?.id === profileUserId || me?.role === 'ADMIN' || createdBy.id === me?.id
  ,[me?.id, me?.role, profileUserId, createdBy])

  const RightSide = useMemo(() =>
    <Alert
      title="Deletar comentário"
      text="Você deseja deletar este comentário?"
      handler={handleDeleteComment}
    >
      <Button bg="transparent">
        <Icon as={RiDeleteBin6Line} h="100%" color="purple.400"/>
      </Button>
    </Alert>
  ,[handleDeleteComment]);

  return (
    <ElementContainer
      stackProps={{ px: '0', ml: '0' }}
      bg="transparent"
      size="sm"
      px="0"
      {...(userHasPermissions && { leftSide: RightSide })}
    >
      <Flex align="center">
        <Avatar name={createdBy.name} src={createdBy.image} size="md"/>
        <Box ml="4" h="100%" overflowX="auto" maxW="70vw">
          <Text color="gray.600" fontSize="sm">{createdBy.name}</Text>
            <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
        </Box>
      </Flex>
    </ElementContainer>
  );
}
