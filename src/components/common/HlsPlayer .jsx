// components/common/HlsPlayer.jsx
import Hls from "hls.js";
import { useEffect, useRef } from "react";

const HlsPlayer = ({ url }) => {
  const videoRef = useRef();

  useEffect(() => {
    let hls;

    if (url && Hls.isSupported()) {
      hls = new Hls({
        debug: false,
        enableWorker: true,
      });
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // iOS Safari
      videoRef.current.src = url;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full"
      controls
      controlsList="nodownload"
      autoPlay
    />
  );
};

export default HlsPlayer;
