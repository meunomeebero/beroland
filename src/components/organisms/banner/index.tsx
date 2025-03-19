import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Draggable } from "../../atoms/draggable";
import { Link } from "../../atoms/link";
import { BaseContentProps } from "../../../types/content";

/**
 * Interface for Banner component props
 */
interface BannerProps extends BaseContentProps {
  data: any;
}

/**
 * Banner component that displays an image with an optional link
 */
export function Banner({ data, isDraggable = false }: BannerProps) {
  // Extract values with fallbacks to prevent errors
  const { id = 0, imageURL = '', url = '#' } = data || {};
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

  const Component = (
    <Flex
      overflow="hidden"
    >
      <Image
        alt="thumbnail"
        src={imageURL}
        height={iframeSize.height}
        width={iframeSize.width}
      />
    </Flex>
  );

  const LinkComponent = (
    <Link href={url} target="__blank">
        {Component}
    </Link>
  );

  return !isDraggable ? LinkComponent : (
    <Draggable id={id} _style={style}>
      {Component}
    </Draggable>
  )
}


