import { Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { useState } from "react";
import Confetti from 'react-confetti-boom';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Content, ContentType } from "../components/templates/content";
import { SocialIcon } from "../components/organisms/social/social";
import { NewsLetter } from "../components/molecules/newsletter";
import { GetServerSideProps, GetStaticProps } from "next";
import { prismaClient } from "./api/_prisma";
import { formatJSON } from "../utils/format-json";

export default function Home({ elements }) {
  const [items, setItems] = useState(elements);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    console.log({active})

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw" align="center" justify="center">
        <Bio p="8" />
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
        <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6" maxW={656}>
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
                  type={si.type}
                  key={si.id}
                  data={si}
                  {...si}
                />
              ))}
            </SortableContext>
          </DndContext>
          <NewsLetter/>
          </Stack>
        </MainContainer>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const elemets = await prismaClient.elements.findMany();

  const formatted = elemets.map(({ order, type, data }) => ({
    id: order,
    type,
    ...formatJSON(data),
  }));

  return {
    props: {
      elements: formatJSON(formatted),
    },
    revalidate: 60 * 30, // one hour
  }
}
