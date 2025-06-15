import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RowMovieCard from "./RowMovieCard";

const HotMovieByCountry = ({ title, movies, viewAllLink = "#" }) => {
  // State quản lý số phim hiển thị
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(3);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gridCols, setGridCols] = useState("grid-cols-3");
  const [showTitleSection, setShowTitleSection] = useState(true);

  // Cập nhật số lượng phim hiển thị dựa trên kích thước màn hình
  useEffect(() => {
    const updateVisibleMovies = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // < sm
        setVisibleMoviesCount(1);
        setGridCols("grid-cols-1");
        setShowTitleSection(false);
      } else if (width < 768) {
        // sm
        setVisibleMoviesCount(2);
        setGridCols("grid-cols-2");
        setShowTitleSection(true);
      } else {
        // md và lớn hơn
        setVisibleMoviesCount(3);
        setGridCols("grid-cols-3");
        setShowTitleSection(true);
      }
    };

    // Thiết lập ban đầu
    updateVisibleMovies();

    // Thiết lập sự kiện resize
    window.addEventListener("resize", updateVisibleMovies);

    // Cleanup
    return () => window.removeEventListener("resize", updateVisibleMovies);
  }, []);

  // Tính toán vị trí kết thúc và mảng phim hiển thị
  const endIndex = startIndex + visibleMoviesCount;
  const visibleMovies = movies.slice(startIndex, endIndex);

  // Xác định có thể di chuyển sang trái/phải không
  const canGoLeft = startIndex > 0;
  const canGoRight = endIndex < movies.length;

  // Xử lý khi click nút trái
  const handlePrevious = () => {
    if (canGoLeft && !isAnimating) {
      setIsAnimating(true);
      setStartIndex((prev) => Math.max(prev - 1, 0));

      // Reset trạng thái animation sau 500ms
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Xử lý khi click nút phải
  const handleNext = () => {
    if (canGoRight && !isAnimating) {
      setIsAnimating(true);
      setStartIndex((prev) =>
        Math.min(prev + 1, movies.length - visibleMoviesCount),
      );

      // Reset trạng thái animation sau 500ms
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="mb-6 px-2 sm:mb-8 sm:px-4 md:mb-10 md:px-6">
      <div
        className={
          showTitleSection
            ? "grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr] md:grid-cols-[200px_1fr]"
            : "block"
        }
      >
        {/* Title and view all link - left column - hidden on small screens */}
        {/* {showTitleSection && (
        
        )} */}
        <div className="hidden flex-col justify-center sm:flex">
          <p className="mb-2 text-xl font-bold text-mainColor sm:text-2xl md:mb-3">
            {title}
          </p>
          <Link
            to={viewAllLink}
            className="flex items-center gap-1 text-xs text-gray-400 transition-colors duration-200 hover:text-mainColor sm:text-sm"
          >
            Xem toàn bộ <RightOutlined className="text-[10px] sm:text-xs" />
          </Link>
        </div>

        {/* Movie list - right column (takes full width on small screens) */}
        <div className="relative">
          {/* Phim container */}
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px]">
            {/* Container cho phim hiện tại - Grid Layout */}
            <div
              className={`grid ${gridCols} gap-2 transition-all duration-300 sm:gap-3 md:gap-5`}
            >
              {(visibleMovies || []).map((movie) => (
                <div
                  key={movie.id}
                  className="transition-all duration-500 ease-in-out"
                >
                  <RowMovieCard movie={movie} key={movie.movieId} />
                </div>
              ))}
            </div>

            {/* Previous button */}
            {canGoLeft && (
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className="absolute -left-11 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white transition-colors hover:bg-gray-500 disabled:opacity-50 sm:h-8 sm:w-8 md:h-9 md:w-9"
                aria-label="Previous movies"
              >
                <LeftOutlined />
              </button>
            )}

            {/* Next button */}
            {canGoRight && (
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="absolute -right-11 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-400 text-white transition-colors hover:bg-gray-500 disabled:opacity-50 sm:h-8 sm:w-8 md:h-9 md:w-9"
                aria-label="Next movies"
              >
                <RightOutlined />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotMovieByCountry;
