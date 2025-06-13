import MovieCard from "@components/user/movie/MovieCard";
import MovieFilter from "@components/common/MovieFilter";
import { useGetMovieForUserQuery } from "@service/admin/movieApi";
import { useEffect, useMemo, useState } from "react";
import { movieTypeUrlMapper } from "@consts/movieTypeUrlMapper";
import { Empty, Pagination } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { COUNTRY_NAME_MAP } from "@consts/countryNameMap";
import { useLoading } from "@context/LoadingContext";

const MovieList = ({ movieType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize states from URL search params
  const [selectedCountries, setSelectedCountries] = useState(() => {
    const countries = searchParams.getAll("country");
    return countries.length > 0 ? countries : ["Tất cả"];
  });

  const [isVisibleFilter, setIsVisibleFilter] = useState(false);

  // Set initial movie type from URL or prop
  const [selectedMovieType, setSelectedMovieType] = useState(() => {
    const type = searchParams.get("type");
    if (
      type &&
      (type === "STANDALONE" || type === "SERIES" || type === "Tất cả")
    ) {
      return type;
    }
    return movieTypeUrlMapper[movieType] || "Tất cả";
  });

  // Set initial genres from URL
  const [selectedGenres, setSelectedGenres] = useState(() => {
    const genres = searchParams.getAll("genre");
    return genres.length > 0 ? genres : ["Tất cả"];
  });

  // Set initial search query from URL
  const [searchTerm, setSearchTerm] = useState(() => {
    return searchParams.get("q") || "";
  });

  // Set initial pagination from URL
  const [pagination, setPagination] = useState({
    pageNumber: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("size")) || 32,
  });

  // Cập nhật lại state khi URL thay đổi
  useEffect(() => {
    // Kiểm tra xem thay đổi có đến từ URL hay không
    const isFromUrl = location.state?.fromUrl;

    // Cập nhật selectedCountries từ URL
    const countryParams = searchParams.getAll("country");
    if (countryParams.length > 0 && isFromUrl) {
      setSelectedCountries(countryParams);
      // Xóa genre khi có country được chọn từ URL
      setSelectedGenres(["Tất cả"]);
    }

    // Cập nhật selectedGenres từ URL
    const genreParams = searchParams.getAll("genre");
    if (genreParams.length > 0 && isFromUrl) {
      setSelectedGenres(genreParams);
      // Xóa country khi có genre được chọn từ URL
      setSelectedCountries(["Tất cả"]);
    }

    // Cập nhật searchTerm từ URL
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [searchParams, location.state]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add genres to URL if not "Tất cả"
    if (!selectedGenres.includes("Tất cả")) {
      selectedGenres.forEach((genre) => {
        params.append("genre", genre);
      });
    }

    // Add countries to URL if not "Tất cả"
    if (!selectedCountries.includes("Tất cả")) {
      selectedCountries.forEach((country) => {
        params.append("country", country);
      });
    }

    // Add search term if exists
    if (searchTerm) {
      params.set("q", searchTerm);
    }

    // Add pagination
    if (pagination.pageNumber > 1) {
      params.set("page", pagination.pageNumber.toString());
    }
    if (pagination.pageSize !== 32) {
      params.set("size", pagination.pageSize.toString());
    }

    // Update URL without causing a page refresh
    setSearchParams(params, { replace: true });
  }, [
    selectedMovieType,
    selectedGenres,
    selectedCountries,
    pagination,
    searchTerm,
    setSearchParams,
  ]);

  // Custom setSelectedMovieType function to update URL when movie type changes
  const handleMovieTypeChange = (newMovieType) => {
    setSelectedMovieType(newMovieType);

    // If movie type changes from STANDALONE to SERIES or vice versa, navigate to the correct page
    if (newMovieType === "STANDALONE" && movieType !== "phim-le") {
      navigate(`/phim-le${location.search}`);
    } else if (newMovieType === "SERIES" && movieType !== "phim-bo") {
      navigate(`/phim-bo${location.search}`);
    } else if (newMovieType === "Tất cả" && movieType !== "phim") {
      navigate(`/phim${location.search}`);
    }
  };

  // Handle country changes
  const handleCountryChange = (countries) => {
    setSelectedCountries(countries);
  };

  // Handle genre changes
  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
  };

  const params = useMemo(() => {
    const filteredParams = {
      page: pagination.pageNumber,
      size: pagination.pageSize,
    };

    if (searchTerm) {
      filteredParams.title = searchTerm;
    }

    // Lấy tất cả các tham số từ URL
    const urlGenres = searchParams.getAll("genre");
    const urlCountries = searchParams.getAll("country");

    // Ưu tiên giá trị từ URL search params
    if (urlGenres.length > 0) {
      filteredParams.genreNames = urlGenres;
    } else if (!selectedGenres.includes("Tất cả")) {
      filteredParams.genreNames = selectedGenres;
    }

    if (urlCountries.length > 0) {
      filteredParams.countries = urlCountries;
    } else if (!selectedCountries.includes("Tất cả")) {
      filteredParams.countries = selectedCountries;
    }

    if (selectedMovieType !== "Tất cả") {
      filteredParams.movieType = selectedMovieType;
    }

    return filteredParams;
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    searchTerm,
    selectedGenres,
    selectedMovieType,
    selectedCountries,
    searchParams,
  ]);

  const movieResponse = useGetMovieForUserQuery(params);
  const [movieData, setMovieData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (movieResponse.isSuccess) {
      setMovieData(movieResponse.data.data.result);
      setTotalElements(movieResponse.data.data.meta.totalElements);
    }
    if (movieResponse.isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [movieResponse, showLoading, hideLoading]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: 1,
    }));
  }, [searchTerm, selectedGenres, selectedMovieType, selectedCountries]);

  const handlePageChange = (page, pageSize) => {
    setPagination({
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  return (
    <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      <div className="mb-8">
        <p className="mb-3 text-2xl font-medium text-white">
          {(location.state?.fromUrl && searchParams.get("genre")) ||
          (location.state?.fromUrl && searchParams.get("country"))
            ? searchParams.get("genre")
              ? `Phim ${searchParams.get("genre")}`
              : `Phim ${COUNTRY_NAME_MAP[searchParams.get("country")]}`
            : !selectedGenres.includes("Tất cả") ||
                !selectedCountries.includes("Tất cả")
              ? "Kết quả tìm kiếm"
              : movieType === "phim-bo"
                ? "Phim bộ"
                : movieType === "phim-le"
                  ? "Phim lẻ"
                  : "Tất cả phim"}
        </p>
      </div>
      <MovieFilter
        selectedCountries={selectedCountries}
        setSelectedCountries={handleCountryChange}
        selectedGenres={selectedGenres}
        setSelectedGenres={handleGenreChange}
        selectedMovieType={selectedMovieType}
        setSelectedMovieType={handleMovieTypeChange}
        isVisibleFilter={isVisibleFilter}
        setIsVisibleFilter={setIsVisibleFilter}
      />
      {movieResponse?.isSuccess && movieData.length === 0 ? (
        <div className="mt-10 flex items-center justify-center">
          <Empty
            description={
              <p className="text-lg font-bold text-white">
                Không tìm thấy phim
              </p>
            }
            className="!text-white"
          />
        </div>
      ) : (
        <div>
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
              // showSizeChanger
              showQuickJumper
              className="custom-pagination"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
