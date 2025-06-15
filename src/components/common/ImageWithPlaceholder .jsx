import { useState } from "react";
import { Image } from "antd";

const ImageWithPlaceholder = ({ src, alt, className, preview = false }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-400"
          style={{ fontSize: 14, color: "#999" }}
        >
          <img
            src="https://placehold.co/300x400?text=Loading"
            alt="Loading placeholder"
            className="h-full w-full object-cover blur-md"
          />
        </div>
      )}
      <Image
        src={src ? src : "https://placehold.co/300x400?text=Loading"}
        alt={alt}
        preview={preview}
        className={loaded ? "h-full w-full object-cover" : "opacity-0"}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        wrapperClassName="w-full h-full"
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
