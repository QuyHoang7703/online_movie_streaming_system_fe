import MovieCard from "@components/user/movie/MovieCard";
import MovieFilter from "@components/common/MovieFilter";
import { useGetMovieForUserQuery } from "@service/admin/movieApi";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { movieTypeUrlMapper } from "@consts/movieTypeUrlMapper";
import { Pagination } from "antd";

const MovieList = ({ movieType }) => {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState(["Tất cả"]);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const [selectedMovieType, setSelectedMovieType] = useState(
    movieTypeUrlMapper[movieType],
  );
  const [selectedGenres, setSelectedGenres] = useState(["Tất cả"]);
  const [searchDebounced, setSearchDebounced] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  console.log({ movieType: movieTypeUrlMapper[movieType] });
  // Tạo debounce function
  const debouncedSearch = debounce((value) => {
    setSearchDebounced(value);
  }, 500);

  const handleSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 20,
  });

  const params = useMemo(() => {
    const filteredParams = {
      page: pagination.pageNumber,
      size: pagination.pageSize,
    };

    if (searchDebounced) {
      filteredParams.title = searchDebounced;
    }

    if (!selectedGenres.includes("Tất cả")) {
      filteredParams.genreNames = selectedGenres;
    }

    if (selectedMovieType !== "Tất cả") {
      filteredParams.movieType = selectedMovieType;
    }

    if (!selectedCountries.includes("Tất cả")) {
      filteredParams.countries = selectedCountries;
    }

    return filteredParams;
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    searchDebounced,
    selectedGenres,
    selectedMovieType,
    selectedCountries,
  ]);

  console.log({ params });

  const movieResponse = useGetMovieForUserQuery(params);
  const [movieData, setMovieData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    if (movieResponse.isSuccess) {
      console.log({ movies: movieResponse.data.data.result });
      setMovieData(movieResponse.data.data.result);
      setTotalElements(movieResponse.data.data.meta.totalElements);
    }
  }, [movieResponse]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
  }, [searchDebounced, selectedGenres, selectedMovieType, selectedCountries]);

  const handlePageChange = (page, pageSize) => {
    setPagination({
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  return (
    <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      <p className="mb-3 text-2xl font-medium text-white">
        {movieType === "phim-bo" ? "Phim bộ" : "Phim lẻ"}
      </p>
      <MovieFilter
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedMovieType={selectedMovieType}
        setSelectedMovieType={setSelectedMovieType}
        isVisibleFilter={isVisibleFilter}
        setIsVisibleFilter={setIsVisibleFilter}
      />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-6 xl:grid-cols-8">
        {movieData.map((movie) => (
          <MovieCard key={movie.movieId} movie={movie} variant="default" />
        ))}
      </div>

      {/* Pagination component */}
      <div className="mt-7 flex justify-center">
        <Pagination
          current={pagination.pageNumber}
          pageSize={pagination.pageSize}
          total={totalElements}
          onChange={handlePageChange}
          showSizeChanger
          showQuickJumper
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default MovieList;
