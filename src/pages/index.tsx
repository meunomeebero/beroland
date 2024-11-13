import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti-boom';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Content } from "../components/templates/content";
import { Lead } from "../components/molecules/lead";
import { prismaClient } from "./api/_prisma";
import { formatJSON } from "../utils/format-json";
import { GetServerSideProps } from "next";
import { Location } from "@prisma/client";
import { Link } from "../components/atoms/link";

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

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Apenas rola a página se ainda não rolou
    if (!hasScrolled) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
        setHasScrolled(true); // Marca como rolado
      }, 100);
    }
  }, [hasScrolled]);


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
        <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6" maxW={598}>
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
          <Lead location={Location.BR}/>
          </Stack>
        </MainContainer>
        <Divider/>
        <Link href="https://www.instagram.com/meunomeebero" target="__blank">
          <Text opacity={0.5}>
            Feito pelo Bero com amor ❤️
          </Text>
        </Link>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const page = await prismaClient.pages.findFirst({
    where: {
      slug: 'home',
    },
    include: {
      elements: true,
    }
  });

  const formatted = page?.elements.map(({ order, type, data }) => ({
    id: order,
    type,
    ...formatJSON(data),
  }));

  return {
    props: {
      elements: formatJSON(formatted ?? []),
    }
  }
}
