import {
  HeartOutlined,
  InfoCircleOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import VARIANTS from "@consts/variants";
import { Button } from "antd";
import React from "react";

const MoviePreviewCard = ({
  movie,
  isNearRightEdge,
  variant = "default", // Thêm variant prop
}) => {
  const genres = movie.genres || ["Hành Động", "Phiêu Lưu"];

  // Lấy cấu hình dựa theo variant
  const config = VARIANTS[variant] || VARIANTS.default;

  return (
    <div
      className={`absolute ${config.positionClass} z-50 mt-2 overflow-hidden rounded-lg bg-dark-300 shadow-xl ${isNearRightEdge ? "right-[-10px]" : "left-[-10px]"}`}
      style={{ width: config.width }}
    >
      {/* Preview Image */}
      <div className="relative w-full" style={{ height: config.imageHeight }}>
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-white">{movie.title}</h3>
        <div className="mb-3 flex gap-2">
          <Button
            icon={<PlayCircleFilled />}
            size="middle"
            className="!flex !items-center !rounded-full !border-none !bg-mainUserColor-100 !p-3 !font-medium !text-black hover:!opacity-90"
          >
            Xem Phim
          </Button>

          <Button
            icon={<HeartOutlined />}
            size="middle"
            type="text"
            className="!flex !items-center !justify-center !border-2 !border-gray-700 !bg-gray-800/80 !font-medium !text-white hover:!bg-gray-700"
          >
            Thích
          </Button>
          <Button
            icon={<InfoCircleOutlined />}
            size="middle"
            type="text"
            className="!flex !items-center !justify-center !border-2 !border-gray-700 !bg-gray-800/80 !font-medium !text-white hover:!bg-gray-700"
          >
            Thông tin
          </Button>
        </div>

        {/* Info Row */}
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
          <span>T{movie.type || "16"}</span>
          <span>•</span>
          <span>{movie.year || "2024"}</span>
          <span>•</span>
          <span>{movie.duration || "2h 30m"}</span>
        </div>

        {/* Genres */}
        <div className="mb-3 flex flex-wrap gap-2">
          {genres.map((genre, index) => (
            <React.Fragment key={index}>
              <span className="rounded bg-gray-800 p-1 text-xs text-gray-300">
                {genre}
              </span>
              {index < genres.length - 1 && (
                <span className="text-white">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePreviewCard;
