import { Flex, useToast } from "@chakra-ui/react";
import { RiMessage3Fill } from 'react-icons/ri';
import { FormEvent, useCallback } from "react";
import { SimpleModal } from "../../molecules/simple-modal";
import { IconAndText } from "../../molecules/icon-and-text";
import useSessionStorage from "../../../states/hooks/use-session-storage";
import axios from "axios";

export function CreateComment({ profileUserId, handler, me }) {
  const toast = useToast();
  const token = useSessionStorage('token', me);

  const handlePostComment = useCallback(
    async (event: FormEvent<HTMLElement>) => {
      const content = event.target['content'].value;
      const commentDto = { profileUserId, token, content };

      try {
        await axios.post('/api/v1/users/profiles/comments', commentDto);
        handler();
      } catch (error) {
        toast({ title: 'Erro ao comentar', status: 'error' });
      }
    }, [toast, token, profileUserId, handler],
  );

  return (
      <Flex align="center">
        <SimpleModal
          handler={handlePostComment}
          textAreaProps={{ placeHolder: "Seu comentário aqui"}}
        >
          <IconAndText
            icon={RiMessage3Fill}
            text="Comentar"
          />
        </SimpleModal>
      </Flex>
  );
}
