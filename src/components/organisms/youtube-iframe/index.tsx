import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

export function YoutubeIframe({ id, videoId }) {
  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });

  console.log({ comp: 'YoutubeIframe', id, videoId })

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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: iframeSize.width,
    height: iframeSize.height,
    cursor: 'grabbing',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <iframe
        width={iframeSize.width}
        height={iframeSize.height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="picture-in-picture"
        allowFullScreen
      >
      </iframe>
    </div>
  );
}
