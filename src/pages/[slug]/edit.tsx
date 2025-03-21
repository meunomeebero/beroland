import { Button, Flex, Icon, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { MainContainer } from "../../components/atoms/main-container";
import { Bio } from "../../components/organisms/bio";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti-boom';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Content, ContentType } from "../../components/templates/content";
import { prismaClient } from "../api/_prisma";
import { formatJSON } from "../../utils/format-json";
import { GetServerSideProps } from "next";
import axios from "axios";
import { debounce } from "../../utils/debounce";
import { EditHead } from "../../components/atoms/edit-head";
import { CreateElement } from "../../components/templates/create-element";
import { FaTrash } from "react-icons/fa"
import { formatElements } from "../../utils/formatElements";
import { ThemeToggle } from "../../components/molecules/theme-toggle";

export default function Home({ elements, slug }: { elements: Array<{ id: number, type: any, dbId: number }>, slug: string }) {
  const [component, setComponent] = useState("SOCIAL");
  const [items, setItems] = useState(elements.sort((a, b) => a.id - b.id));
  const [isDeleting, setIsDeleting] = useState(false);

  // Pré-calculando os valores de cores para evitar chamadas condicionais de hooks
  const deletingBgColor = useColorModeValue("gray.200", "gray.700");
  const normalBgColor = useColorModeValue("gray.100", "gray.800");

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
      <EditHead title={slug} />
      <ThemeToggle />
      <Flex direction="column"  w="100vw" align="center" justify="center">
        <Bio p="8" />
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
        <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6" maxW={598}>
          <Flex align="center" justify="center" direction="column" p="14px" bg={useColorModeValue("gray.100", "gray.800")} borderRadius="lg">
            <Select id="component" variant='flushed' value={component} padding={1} onChange={e => setComponent(e.target.value)} mb="4">
              {Object.entries(ContentType).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
              ))}
            </Select>
            <CreateElement
              type={component}
              items={items}
              setItems={setItems}
              title={slug}
              component={component}
            />
          </Flex>
          <Flex w="100%">
            <Button
              p="7"
              bg={isDeleting ? deletingBgColor : normalBgColor}
              borderRadius="md"
              onClick={() => setIsDeleting(state => !state)}
            >
              <Icon as={FaTrash} color="purple.400"/>
              <Text pl="4" fontWeight="bold">
                Deletar
              </Text>
            </Button>
          </Flex>
          { !isDeleting ? (
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
                    isDeleting={isDeleting}
                    isEditing
                    type={si.type}
                    key={si.id}
                    isDraggable
                    reload={setItems}
                    data={si}
                    {...si}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ): (
            <>
              {items.map(si =>
                <Content
                  isDeleting={isDeleting}
                  isEditing
                  type={si.type}
                  reload={() => setItems(items.filter(i => i.id !== si.id))}
                  key={si.id}
                  isDraggable
                  data={si}
                  {...si}
                />
              )}
            </>
          )}
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
