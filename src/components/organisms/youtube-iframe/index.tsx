import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Draggable } from "../../atoms/draggable";

// Interface para as props
interface YoutubeIframeProps {
  data: any;  // Para compatibilidade com ContentProps
  isDraggable?: boolean;
  type?: string;  // Para compatibilidade com ContentProps
  dbId?: number;  // Para compatibilidade com ContentProps
  reload?: (data?: any) => void;  // Para compatibilidade com ContentProps
  isEditing?: boolean;  // Para compatibilidade com ContentProps
  isDeleting?: boolean;  // Para compatibilidade com ContentProps
}

export function YoutubeIframe({ data, isDraggable = false }: YoutubeIframeProps) {
  // Extrair valores com fallbacks para evitar erros
  const { id = 0, videoId = '' } = data || {};
  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth > 598 ? 598 : window.innerWidth - 32;
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


