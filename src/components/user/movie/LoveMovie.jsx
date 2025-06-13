import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import { HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const LoveMovie = ({ movie }) => {
  const { toggleFavorite, isProcessing } = useFavoriteMovie();
  return (
    <div>
      <Button
        icon={<HeartFilled />}
        size="middle"
        type="text"
        className={`!flex !items-center !justify-center !border-2 !border-gray-700 !bg-gray-800/80 !font-medium !text-white hover:!bg-gray-700 ${movie.favorite ? "!text-mainUserColor-100" : ""}`}
        loading={isProcessing}
        onClick={() =>
          toggleFavorite({
            movieId: movie.movieId,
            isFavorite: movie.favorite,
          })
        }
      >
        {movie.favorite ? "Đã thích" : "Thích"}
      </Button>
    </div>
  );
};

export default LoveMovie;
