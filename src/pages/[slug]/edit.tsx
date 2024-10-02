import { Box, Button, Flex, Input, Select, Stack, Text } from "@chakra-ui/react";
import { MainContainer } from "../../components/atoms/main-container";
import { FeedHead as Head } from "../../components/atoms/feed-head";
import { Bio } from "../../components/organisms/bio";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Confetti from 'react-confetti-boom';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Content } from "../../components/templates/content";
import { prismaClient } from "../api/_prisma";
import { formatJSON } from "../../utils/format-json";
import { GetServerSideProps } from "next";
import axios from "axios";
import { debounce } from "../../utils/debounce";
import { Title } from "../../components/atoms/title";
import { EditHead } from "../../components/atoms/edit-head";
import { ContentType, Elements } from "@prisma/client";
import { SocialIcon } from "../../components/organisms/social/social";
import { CreateElementParams } from "../api/elements";
import { CreateSocial } from "../../components/organisms/create-social";
import { CreateContent } from "../../components/templates/create-content";

function formatElements(elements: Elements[]) {
  return elements.map(({ order, type, data, id }) => ({
    id: order + 1, // +1 to avoid position 0
    dbId: id,
    type,
    ...formatJSON(data),
  }));
}

export default function Home({ elements, slug }: { elements: Array<{ id: number, type: any, dbId: number }>, slug: string }) {
  const [title, setTitle] = useState(slug);
  const [component, setComponent] = useState("SOCIAL");
  const [items, setItems] = useState(elements.sort((a, b) => a.id - b.id));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    const data = items.map((i, index) => ({ id: i.dbId, order: index }));

    async function saveToDB() {
      try {
        await axios.put('/api/elements', { elements: data });
      } catch (err) {
        alert(err)
      }
    }

    debounce(100, saveToDB)
  }, [items]);

  return (
    <>
      <EditHead title={title} />
      <Flex direction="column"  w="100vw" align="center" justify="center">
        <Bio p="8" />
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
        <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6" maxW={656}>
          <Box w="100%">
            <Title>
              Título da pagina
            </Title>
            <Flex w="100%">
              <Input
                variant="unstyled"
                w="60%"
                type="text"
                name="title"
                id="title"
                autoComplete="true"
                borderRadius="0"
                bg="gray.800"
                placeholder="Título"
                value={title}
                onChange={e => debounce(1000, () => setTitle(e.target.value))}
                py="2"
                px="4"
              />
              <Button variant="solid" w="40%" borderRadius="0" onClick={console.log}>
                <Text color="gray.600" fontWeight="bold">
                  Confirmar
                </Text>
              </Button>
            </Flex>
          </Box>
          <Select id="component" variant='flushed' value={component} padding={1} onChange={e => setComponent(e.target.value)}>
            {Object.keys(ContentType).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </Select>
          <CreateContent
            type={component}
            items={items}
            setItems={setItems}
            title={title}
            component={component}
          />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map(si => (
                <Content
                  isEditing
                  type={si.type}
                  key={si.id}
                  isDraggable
                  data={si}
                  {...si}
                />
              ))}
            </SortableContext>
          </DndContext>
          </Stack>
        </MainContainer>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  let page = await prismaClient.pages.findFirst({
    where: {
      slug: slug as string,
    },
    include: {
      elements: true,
    }
  });

  if (!page) {
    page = await prismaClient.pages.create({
      data: {
        title: 'New page',
        slug: slug as string,
      },
      include: {
        elements: true,
      }
    });
  }

  const elements = page.elements;

  const formatted = formatElements(elements)

  return {
    props: {
      elements: formatJSON(formatted),
      slug
    }
  }
}
