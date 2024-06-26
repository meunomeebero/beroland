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
import { Content } from "../components/templates/content";
import { NewsLetter } from "../components/molecules/newsletter";
import { prismaClient } from "./api/_prisma";
import { formatJSON } from "../utils/format-json";
import { GetServerSideProps } from "next";
import { Location } from "@prisma/client";

export default function Home({ elements }: { elements: Array<{ id: number, type: any }> }) {
  const [items, setItems] = useState(
    elements.sort((a, b) => a.id - b.id)
  );

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
        <Bio pt="8" pb="0" />
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
          <NewsLetter location={Location.BR}/>
          </Stack>
        </MainContainer>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const elemets = await prismaClient.elements.findMany({ where: { location: Location.BR } });

  const formatted = elemets.map(({ order, type, data }) => ({
    id: order,
    type,
    ...formatJSON(data),
  }));

  return {
    props: {
      elements: formatJSON(formatted),
    }
  }
}
