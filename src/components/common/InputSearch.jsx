import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import MovieInformation from "@components/user/movie/MovieDetail/MovieInformation";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import { useGetActorsQuery } from "@service/admin/actorApi";
import { useGetMovieForUserQuery } from "@service/admin/movieApi";
import { Input, Spin, Divider, Image } from "antd";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MovieSearchResult from "@components/common/MovieSearchResult";

const InputSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredActors, setFilteredActors] = useState([]);
  const [isInputLoading, setIsInputLoading] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Use pagination params for better API performance
  const { data: movies, isLoading: isMoviesLoading } = useGetMovieForUserQuery(
    searchValue ? { title: searchValue, page: 1, size: 5 } : {},
  );
  const { data: actors, isLoading: isActorsLoading } = useGetActorsQuery(
    searchValue ? { actorName: searchValue, page: 1, size: 2 } : {},
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Set loading state immediately when user starts typing
    if (searchValue && searchValue.trim() !== "") {
      setIsInputLoading(true);
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchValue && searchValue.trim() !== "") {
      // Set a timeout of 500ms before updating the search results
      timeoutRef.current = setTimeout(() => {
        // Movies
        const matchedMovies = movies?.data?.result || [];
        setFilteredMovies(matchedMovies);

        // Actors
        const matchedActors = actors?.data?.result || [];
        setFilteredActors(matchedActors);

        setShowResults(true);
        setIsInputLoading(false);
      }, 500);
    } else {
      setFilteredMovies([]);
      setFilteredActors([]);
      setShowResults(false);
      setIsInputLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchValue, movies, actors]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchValue.trim() !== "") {
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setShowResults(false);
    }
  };

  const handleMovieClick = (movieType, movieId) => {
    navigate(`/${movieTypeUrlMapperReverse[movieType]}/${movieId}`);
    setShowResults(false);
    setSearchValue("");
  };

  const handleActorClick = (actorId) => {
    navigate(`/dien-vien/${actorId}`);
    setShowResults(false);
    setSearchValue("");
  };

  const handleViewAllResults = () => {
    if (searchValue.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setShowResults(false);
    }
  };

  // Calculate loading state
  const isLoading = isInputLoading || isMoviesLoading || isActorsLoading;

  return (
    <div className="relative" ref={searchRef}>
      <Input
        placeholder="Tìm kiếm phim, diễn viên"
        className="!w-[350px] !rounded !border-none !bg-[#323D4E] !px-3 !py-2 font-medium !text-white"
        prefix={
          isLoading ? (
            <LoadingOutlined className="text-white/70" spin />
          ) : (
            <SearchOutlined className="text-white/70" />
          )
        }
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearch}
        onClick={() => searchValue && setShowResults(true)}
      />

      {showResults && searchValue?.trim() !== "" && (
        <div className="absolute left-0 z-50 mt-1 max-h-[80vh] w-full overflow-auto rounded bg-[#1A1D29] p-2 text-white shadow-lg">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                tip="Đang tìm kiếm..."
              />
            </div>
          ) : (
            <>
              {filteredMovies.length === 0 && filteredActors.length === 0 && (
                <div className="py-3 text-center text-gray-400">
                  Không tìm thấy kết quả
                </div>
              )}

              {filteredMovies.length > 0 && (
                <div>
                  <div className="mb-2 px-2 text-sm text-gray-400">
                    Danh sách phim
                  </div>
                  {filteredMovies.map((movie) => (
                    <MovieSearchResult
                      key={movie.id || movie.movieId}
                      movieInfo={movie}
                      handleMovieClick={handleMovieClick}
                    />
                  ))}
                </div>
              )}

              {filteredActors.length > 0 && (
                <div>
                  {filteredMovies.length > 0 && (
                    <Divider className="!my-2 !border-gray-700" />
                  )}
                  <div className="mb-2 px-2 text-sm text-gray-400">
                    Danh sách diễn viên
                  </div>
                  {filteredActors.map((actor) => (
                    <div
                      key={actor.id || actor.actorId}
                      className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-dark-100"
                      onClick={() =>
                        handleActorClick(actor.id || actor.actorId)
                      }
                    >
                      <Image
                        src={actor.avatarUrl}
                        alt={actor.name}
                        className="rounded-full object-cover"
                        width={50}
                        height={50}
                        preview={false}
                      />
                      <div>
                        <div className="font-medium">{actor.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(filteredMovies.length > 0 || filteredActors.length > 0) && (
                <div
                  className="mt-2 cursor-pointer rounded-md bg-[#323D4E] p-2 text-center text-sm font-medium text-white hover:bg-[#3E4A5C]"
                  onClick={handleViewAllResults}
                >
                  Xem tất cả kết quả tìm kiếm "{searchValue}"
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
