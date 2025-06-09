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

// components/common/HlsPlayer.jsx
// import Hls from "hls.js";
// import { useEffect, useRef } from "react";

// const HlsPlayer = ({ url }) => {
//   const videoRef = useRef();
//   const lastUpdateTime = useRef(null);
//   const watchTimeRef = useRef(0); // Lưu tổng thời gian xem video

//   useEffect(() => {
//     let hls;
//     const video = videoRef.current;

//     if (url && Hls.isSupported()) {
//       hls = new Hls({ debug: false, enableWorker: true });
//       hls.loadSource(url);
//       hls.attachMedia(video);
//     } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = url;
//     }

//     const handleTimeUpdate = () => {
//       const now = Date.now();
//       if (lastUpdateTime.current !== null) {
//         const delta = (now - lastUpdateTime.current) / 1000; // giây
//         if (delta < 5) {
//           // Nếu không phải jump/tua
//           watchTimeRef.current += delta;
//         }
//         console.log(
//           `🕒 Đã xem: ${Math.floor(watchTimeRef.current / 60)} phút ${Math.floor(
//             watchTimeRef.current % 60,
//           )} giây`,
//         );
//       }
//       lastUpdateTime.current = now;
//     };

//     video?.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       if (hls) hls.destroy();
//       video?.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, [url]); // KHÔNG đưa watchTime vào dependencies

//   return (
//     <video
//       ref={videoRef}
//       className="h-full w-full"
//       controls
//       controlsList="nodownload"
//       autoPlay
//     />
//   );
// };

// export default HlsPlayer;
