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

export default function Home() {
  const [items, setItems] = useState([
    {
      id: 1,
      type: ContentType.Affiliate,
      link: "https://app.codecrafters.io/join?via=meunomeebero",
      title: "🔥 Aprenda a construir seu próprio redis, docker, torrent e muito mais do zero com a",
      highlight: 'CodeCrafters',
      image: 'https://app.codecrafters.io/assets/7408d202b2bb110054fc.svg',
    },
    {
      id: 2,
      type: ContentType.Iframe,
      videoId: "yU6Nhy3OC8Q",
    },
    {
      id: 3,
      content: '@meunomeebero',
      fallbackLink: 'https://www.youtube.com/@meunomeebero',
      link: 'youtube://www.youtube.com/user/meunomeebero',
      title: "YouTube - Shorts",
      type: ContentType.Social,
      icon: SocialIcon.YouTube
    },
    {
      id: 4,
      content: '@berolab',
      fallbackLink: 'https://www.youtube.com/@berolab',
      link: 'https://www.youtube.com/@berolab',
      title: "YouTube - Dicas de carreira",
      type: ContentType.Social,
      icon: SocialIcon.YouTube
    },
    {
      id: 5,
      content: '@meunomeebero',
      fallbackLink: 'https://www.instagram.com/meunomeebero',
      link: 'https://www.instagram.com/meunomeebero',
      title: "Instagram",
      type: ContentType.Social,
      icon: SocialIcon.Instagram
    },
    {
      id: 6,
      content: '@meunomeebero',
      fallbackLink: 'https://www.tiktok.com/@meunomeebero',
      link: 'https://www.tiktok.com/@meunomeebero',
      title: "TikTok",
      type: ContentType.Social,
      icon: SocialIcon.TikTok
    },
    {
      id: 7,
      content: 'mansaodev',
      fallbackLink: 'https://discord.gg/2e9RqKQuZV',
      link: 'discord://discord.com/invite/2e9RqKQuZV',
      title: "Discord",
      type: ContentType.Social,
      icon: SocialIcon.Discord
    },
    {
      id: 8,
      type: ContentType.Affiliate,
      link: "https://shipfa.st/?via=bero",
      title: "🔥 Crie sua micro SaaS em apenas um dia com a",
      highlight: 'ShipFast',
      image: '/static/sf.png',
    }
  ]);

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
