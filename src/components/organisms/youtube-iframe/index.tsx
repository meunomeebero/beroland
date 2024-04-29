import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Draggable } from "../../atoms/draggable";

export function YoutubeIframe({ data: { id, videoId }, isDraggable}) {
  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });

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

  const style = {
    width: iframeSize.width,
    height: iframeSize.height,
  };

  const getVideoThumb = (id: string) => {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  }

  const Component = (
    <iframe
      width={iframeSize.width}
      height={iframeSize.height}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="picture-in-picture"
      allowFullScreen
    />
  );

  const DraggableComponent = (
    <Flex
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        alt="thumbnail"
        src={getVideoThumb(videoId)}
        height={iframeSize.height}
        width={iframeSize.width}
      />
    </Flex>
  );

  return !isDraggable ? Component : (
    <Draggable id={id} _style={style}>
      {DraggableComponent}
    </Draggable>
  )
}


