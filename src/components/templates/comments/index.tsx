import { Flex } from "@chakra-ui/react";
import { Comment, CommentDataProps } from "../../organisms/comment";

type CommentsProps = {
  handler?: () => void;
  userProfileComments: CommentDataProps[];
  commentContainerProps?: any;
}

export function Comments({ handler, commentContainerProps, userProfileComments }: CommentsProps) {
  return (
    <Flex direction="column" align="center" w="100%">
      {userProfileComments.map((comment, i, a) => (
        <Comment
          key={i}
          data={comment}
          handler={handler}
          containerProps={{
            borderBottomRadius: i === a.length - 1 ? 8 : 0,
            borderTopRadius: 0,
            maxWidth: "772px",
            ...(commentContainerProps || {}),
          }}
        />
      ))}
    </Flex>
  );
}
