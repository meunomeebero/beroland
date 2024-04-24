import { Box, Flex, Text, Avatar, Divider, Icon, Tooltip } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { dracula } from "../../../styles/theme";
import { UserProps } from "./user-props";
import { Link } from "../../atoms/link";
import { useCallback, useMemo } from "react";
import { BsChevronDoubleRight } from 'react-icons/bs';

const flexStyled = (color: string) => ({
  transition: "0.2s",
  position: 'relative',
  border: "2px solid transparent",
  _hover: {
    transform: 'scale(1.01)',
    borderColor: color ?? dracula.Comment,
  }
}) as any;

const aStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}

export function User({
  containerProps,
  data,
  position,
  isSearching,
}: UserProps) {
  const { badge, color } = useMemo(() => {
    if (isSearching) {
      return {
        badge: undefined,
        color: undefined,
      };
    }

    const badges = {
      "0": "🗿",
      "1": "🥇",
      "2": "🥈",
      "3": "🥉",
    };

    const colors = {
      "0": "#ff79c6",
      "1": "#bd93f9",
      "2": "#50fa7b",
      "3": "#8be9fd",
    }

    return {
      badge: badges[position],
      color: colors[position],
    };
  }, [position, isSearching]);

  const getProfileEmoji = useCallback(() => {
    const acv = data.achievements.find(ac => {
      return ac.achievementId === 15
    });

    if (acv) {
      return "👑";
    }

  }, [data.achievements]);

  return (
    <ElementContainer
      size="sm"
      stackProps={{ padding: '0 1rem', margin: '0', ml: '0' }}
      {...containerProps}
      {...flexStyled(color)}
    >
      <Flex h="100%">
        <Link
          href={`/users/${data.id}`}
          aProps={aStyle}
        >
          <Avatar size="lg" border="2px solid #6272a4" src={data.image} name={data.name}/>
          <Divider orientation="vertical" h="100%" ml="4" mr="4" />
          <Box ml="4" mr="auto">
            <Text color="gray.600" fontSize="sm" noOfLines={1}>{data.name}</Text>
            <Text display="flex" fontSize="sm" mt="1" color="green.400">
              {data.points}
              <Text color="gray.50" opacity={0.5} ml="1">pts</Text>
            </Text>
          </Box>
          {badge && <Text mr="4" fontSize="4xl">{badge}</Text>}
          {getProfileEmoji() &&
            <Tooltip label="Inscrito do mês" bg="gray.800" color="gray.50">
              <Text mr="4" fontSize="4xl">{getProfileEmoji()}</Text>
            </Tooltip>
          }
          <Icon as={BsChevronDoubleRight} color="gray.600"/>
        </Link>
      </Flex>
    </ElementContainer>
  );
}
