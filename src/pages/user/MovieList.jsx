import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "@components/user/movie/MovieCard";
import UnifiedMovieCard from "@components/user/movie/UnifiedMovieCard";
import MovieFilter from "@components/common/MovieFilter";

const koreanMovies = [
  {
    id: 1,
    title: "Người Hùng Yếu Đuối",
    englishTitle: "Weak Hero Class",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
    quality: "4K",
  },
  {
    id: 2,
    title: "Chuyến Đời Bác Sĩ Nội Trú",
    englishTitle: "Resident Playbook",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
  },
  {
    id: 3,
    title: "Bảo Hiểm Ly Hôn",
    englishTitle: "The Divorce Insurance",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "11",
    episodes: "8",
  },
  {
    id: 4,
    title: "Cung Điện Ma Ám",
    englishTitle: "The Haunted Palace",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "6",
    episodes: "4",
  },
  {
    id: 5,
    title: "Đẹp Hơn Thiên Đường",
    englishTitle: "Heavenly Ever After",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "6",
    episodes: "4",
  },
  {
    id: 6,
    title: "Nữ Hoàng Nước Mắt",
    englishTitle: "The Queen of Tears",
    poster:
      "https://www.themoviedb.org/t/p/w1280/xRw3akJQdfgqx0x4fiHW7nIkEUJ.jpg",
    subtitled: "16",
    episodes: "16",
  },
  {
    id: 7,
    title: "Dưới Những Tán Hoa",
    englishTitle: "Under the Flowers",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "12",
    episodes: "12",
  },
  {
    id: 8,
    title: "Chuyện Ma Trưa 12 Giờ",
    englishTitle: "Midnight Horror Story",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
  },
  {
    id: 9,
    title: "Dạ Điểu",
    englishTitle: "Nightbird",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "6",
    episodes: "6",
  },
  {
    id: 10,
    title: "Truy Bắt Sát Nhân",
    englishTitle: "A Killer Paradox",
    poster:
      "https://static.nutscdn.com/vimg/400-0/09ddb13727f7653f4c34e311c853c860.jpg",
    subtitled: "8",
    episodes: "8",
  },
];

const MovieList = () => {
  const { movieType } = useParams();

  return (
    <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      <p className="mb-3 text-2xl font-medium text-white">
        {movieType === "phim-bo" ? "Phim bộ" : "Phim lẻ"}
      </p>
      <MovieFilter />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-6 xl:grid-cols-8">
        {koreanMovies.map((movie) => (
          <UnifiedMovieCard key={movie.id} movie={movie} variant="default" />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
