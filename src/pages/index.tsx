import { Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { Social } from "../components/organisms/social";
import { FaYoutube} from 'react-icons/fa';
import { BsDiscord, BsTiktok } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { Affiliate } from "../components/organisms/affiliate";
import { MyOffice } from "../components/organisms/my-office";
import Confetti from 'react-confetti-boom';

const socialContainerProps = { marginLeft: 'auto', marginRight: 'auto' }

export default function Home() {
  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });

  const videoId1 = "yU6Nhy3OC8Q";
  const video2 = "QuHLw_A3WgY";


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

  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw" align="center" justify="center">
        <Bio p="8" />
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
          <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6" maxW={656}>
            <Affiliate
              data={{
                link: "https://app.codecrafters.io/join?via=meunomeebero",
                title: "🔥 Aprenda a construir seu próprio redis, docker, torrent e muito mais do zero com a",
                highlight: 'CodeCrafters',
                image: 'https://app.codecrafters.io/assets/7408d202b2bb110054fc.svg',
              }}
            />
            <iframe
              width={iframeSize.width}
              height={iframeSize.height}
              src={`https://www.youtube.com/embed/${videoId1}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
            <Social
              icon={FaYoutube}
              containerProps={socialContainerProps}
              data={{
                content: '@meunomeebero',
                fallbackLink: 'https://www.youtube.com/@meunomeebero',
                link: 'youtube://www.youtube.com/user/meunomeebero',
                title: "YouTube - Shorts"
              }}
            />
            <Social
              icon={FaYoutube}
              containerProps={socialContainerProps}
              data={{
                content: '@berolab',
                fallbackLink: 'https://www.youtube.com/@berolab',
                link: 'https://www.youtube.com/@berolab',
                title: "YouTube - Dicas de carreira"
              }}
            />
            <Social
              icon={AiFillInstagram}
              containerProps={socialContainerProps}
              data={{
                content: '@meunomeebero',
                fallbackLink: 'https://www.instagram.com/meunomeebero',
                link: 'https://www.instagram.com/meunomeebero',
                title: "Instagram"
              }}
            />
            <Social
              icon={BsTiktok}
              containerProps={socialContainerProps}
              data={{
                content: '@meunomeebero',
                fallbackLink: 'https://www.tiktok.com/@meunomeebero',
                link: 'https://www.tiktok.com/@meunomeebero',
                title: "TikTok"
              }}
            />
            <Social
              icon={BsDiscord}
              containerProps={socialContainerProps}
              data={{
                content: 'mansaodev',
                fallbackLink: 'https://discord.gg/2e9RqKQuZV',
                link: 'discord://discord.com/invite/2e9RqKQuZV',
                title: "Discord"
              }}
            />
            {/* <MyOffice/> */}
            <Affiliate
              data={{
                link: "https://shipfa.st/?via=bero",
                title: "🔥 Criar sua micro SaaS em apenas um dia com a",
                highlight: 'ShipFast',
                image: '/static/sf.png',
              }}
            />
          </Stack>
        </MainContainer>
      </Flex>
    </>
  );
}
