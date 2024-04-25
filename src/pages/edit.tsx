import { Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { Social } from "../components/organisms/social";
import { FaYoutube} from 'react-icons/fa';
import { BsDiscord, BsTiktok } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { Affiliate } from "../components/organisms/affiliate";
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

const socialContainerProps = { marginLeft: 'auto', marginRight: 'auto' }



export default function Home() {
  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });
  const [items, setItems] = useState([
    {
      id: 1,
      content: '@meunomeebero',
      fallbackLink: 'https://www.youtube.com/@meunomeebero',
      link: 'youtube://www.youtube.com/user/meunomeebero',
      title: "YouTube - Shorts",
      type: ContentType.Social,
      icon: SocialIcon.YouTube
    },
    {
      id: 2,
      content: '@berolab',
      fallbackLink: 'https://www.youtube.com/@berolab',
      link: 'https://www.youtube.com/@berolab',
      title: "YouTube - Dicas de carreira",
      type: ContentType.Social,
      icon: SocialIcon.YouTube
    },
    {
      id: 3,
      content: '@meunomeebero',
      fallbackLink: 'https://www.instagram.com/meunomeebero',
      link: 'https://www.instagram.com/meunomeebero',
      title: "Instagram",
      type: ContentType.Social,
      icon: SocialIcon.Instagram
    },
    {
      id: 4,
      content: '@meunomeebero',
      fallbackLink: 'https://www.tiktok.com/@meunomeebero',
      link: 'https://www.tiktok.com/@meunomeebero',
      title: "TikTok",
      type: ContentType.Social,
      icon: SocialIcon.TikTok
    },
    {
      id: 5,
      content: 'mansaodev',
      fallbackLink: 'https://discord.gg/2e9RqKQuZV',
      link: 'discord://discord.com/invite/2e9RqKQuZV',
      title: "Discord",
      type: ContentType.Social,
      icon: SocialIcon.Discord
    },
    {
      id: 6,
      type: ContentType.Iframe,
      videoId: "yU6Nhy3OC8Q",
    }
  ]);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth > 656 ? 656 : window.innerWidth - 32;
      const height = width * 0.5625;
      setIframeSize({ width, height });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

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
                  icon={si.icon}
                  isDraggable
                  containerProps={socialContainerProps}
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
