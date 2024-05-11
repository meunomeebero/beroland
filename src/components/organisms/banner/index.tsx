import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Draggable } from "../../atoms/draggable";
import { Link } from "../../atoms/link";

export function Banner({ data: { id, imageURL, url }, isDraggable}) {
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

  const Component = (
    <Flex
      borderRadius="lg"
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


