import { useState, useEffect, useRef } from "react";
import {
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import MovieCard from "@components/user/movie/MovieCard";

const HotMovieSection = ({
  movies,
  title,
  viewAllLink,
  type = "series",
  variant = "hot",
}) => {
  const containerRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(1);

  // Cập nhật số lượng movie hiển thị dựa trên chiều rộng thực tế
  useEffect(() => {
    const updateVisibleMovies = () => {
      const width = window.innerWidth;

      // Mặc định hiển thị 6 movie cho màn hình lớn
      let visibleCount = 6;

      // Điều chỉnh số lượng movie hiển thị theo kích thước màn hình
      if (width < 640) {
        visibleCount = 2; // Mobile
      } else if (width < 768) {
        visibleCount = 3; // Small tablets
      } else if (width < 1024) {
        visibleCount = 4; // Tablets
      } else if (width < 1280) {
        visibleCount = 5; // Small desktop
      } else {
        visibleCount = 6; // Large desktop
      }

      setVisibleMoviesCount(visibleCount);
    };

    updateVisibleMovies();
    window.addEventListener("resize", updateVisibleMovies);
    return () => window.removeEventListener("resize", updateVisibleMovies);
  }, []);

  const endIndex = startIndex + visibleMoviesCount;
  const visibleMovies = movies.slice(startIndex, endIndex);

  const canGoLeft = startIndex > 0;
  const canGoRight = endIndex < movies.length;

  const handlePrevious = () => {
    if (canGoLeft && !isAnimating) {
      setIsAnimating(true);
      setStartIndex((prev) => Math.max(prev - 1, 0));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (canGoRight && !isAnimating) {
      setIsAnimating(true);
      setStartIndex((prev) =>
        Math.min(prev + 1, movies.length - visibleMoviesCount),
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="mt-10 px-2 sm:px-6 md:px-8">
      <div className="rounded-lg p-3 sm:p-4 md:p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white sm:text-xl md:text-2xl">
            {title}
          </h2>
          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button
                type="text"
                icon={<DoubleRightOutlined />}
                className="flex items-center font-medium text-mainUserColor-200 hover:text-mainUserColor-100"
              >
                Xem tất cả
              </Button>
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="relative">
          {/* Nút trái */}
          {canGoLeft && (
            <button
              onClick={handlePrevious}
              disabled={isAnimating}
              className="absolute -left-12 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white transition-colors hover:bg-gray-500 disabled:opacity-50 sm:h-10 sm:w-10"
              aria-label="Previous movies"
            >
              <LeftOutlined />
            </button>
          )}

          {/* Movie container */}
          <div
            ref={containerRef}
            className={`grid gap-4 transition-all duration-300 sm:gap-5`}
            style={{
              gridTemplateColumns: `repeat(${visibleMoviesCount}, minmax(0, 1fr))`,
            }}
          >
            {visibleMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="transition-all duration-500 ease-in-out"
              >
                <MovieCard
                  movie={movie}
                  rank={startIndex + index + 1}
                  index={startIndex + index}
                  variant={variant}
                />
              </div>
            ))}
          </div>

          {/* Nút phải */}
          {canGoRight && (
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute -right-12 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white transition-colors hover:bg-gray-500 disabled:opacity-50 sm:h-10 sm:w-10"
              aria-label="Next movies"
            >
              <RightOutlined />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotMovieSection;
