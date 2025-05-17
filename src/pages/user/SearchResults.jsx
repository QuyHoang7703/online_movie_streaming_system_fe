import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Tabs, Pagination, Spin, Empty } from "antd";
import { useGetMovieForUserQuery } from "@service/admin/movieApi";
import { useGetActorsQuery } from "@service/admin/actorApi";
import MovieCard from "@components/user/movie/MovieCard";
import { useLoading } from "@context/LoadingContext";
import "@styles/user/styles.css";
import MovieFilter from "@components/common/MovieFilter";
import ImageWithPlaceholder from "@components/common/ImageWithPlaceholder ";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("movie");
  const { showLoading, hideLoading } = useLoading();
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);

  // Initialize filter states from URL
  const [selectedCountries, setSelectedCountries] = useState(() => {
    const countries = searchParams.getAll("country");
    return countries.length > 0 ? countries : ["Tất cả"];
  });

  const [selectedGenres, setSelectedGenres] = useState(() => {
    const genres = searchParams.getAll("genre");
    return genres.length > 0 ? genres : ["Tất cả"];
  });

  const [selectedMovieType, setSelectedMovieType] = useState(() => {
    const type = searchParams.get("type");
    if (
      type &&
      (type === "STANDALONE" || type === "SERIES" || type === "Tất cả")
    ) {
      return type;
    }
    return "Tất cả";
  });

  // Movie pagination
  const [moviePagination, setMoviePagination] = useState({
    page: Number(searchParams.get("page")) || 1,
    size: Number(searchParams.get("size")) || 20,
  });

  // Actor pagination
  const [actorPagination, setActorPagination] = useState({
    page: Number(searchParams.get("page")) || 1,
    size: Number(searchParams.get("size")) || 20,
  });

  // Build search parameters with filters
  const movieSearchParams = useMemo(() => {
    const params = {
      title: searchQuery,
      page: moviePagination.page,
      size: moviePagination.size,
    };

    // Add genre filter
    if (!selectedGenres.includes("Tất cả")) {
      params.genreNames = selectedGenres;
    }

    // Add country filter
    if (!selectedCountries.includes("Tất cả")) {
      params.countries = selectedCountries;
    }

    // Add movie type filter
    if (selectedMovieType !== "Tất cả") {
      params.movieType = selectedMovieType;
    }

    return params;
  }, [
    searchQuery,
    moviePagination,
    selectedGenres,
    selectedCountries,
    selectedMovieType,
  ]);

  // Fetch movies with filters
  const {
    data: movieData,
    isLoading: isMovieLoading,
    isSuccess: isMovieSuccess,
  } = useGetMovieForUserQuery(searchQuery ? movieSearchParams : {});

  // Fetch actors
  const {
    data: actorData,
    isLoading: isActorLoading,
    isSuccess: isActorSuccess,
  } = useGetActorsQuery(
    searchQuery
      ? {
          actorName: searchQuery,
          page: actorPagination.page,
          size: actorPagination.size,
        }
      : {},
  );

  // Handle loading states
  useEffect(() => {
    if (isMovieLoading || isActorLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isMovieLoading, isActorLoading, showLoading, hideLoading]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", activeTab);

    // Add filters to URL
    if (!selectedGenres.includes("Tất cả")) {
      params.delete("genre");
      selectedGenres.forEach((genre) => params.append("genre", genre));
    } else {
      params.delete("genre");
    }

    if (!selectedCountries.includes("Tất cả")) {
      params.delete("country");
      selectedCountries.forEach((country) => params.append("country", country));
    } else {
      params.delete("country");
    }

    if (selectedMovieType !== "Tất cả") {
      params.set("type", selectedMovieType);
    } else {
      params.delete("type");
    }

    // Add pagination
    if (activeTab === "movie") {
      if (moviePagination.page > 1) {
        params.set("page", moviePagination.page.toString());
      } else {
        params.delete("page");
      }
    } else {
      if (actorPagination.page > 1) {
        params.set("page", actorPagination.page.toString());
      } else {
        params.delete("page");
      }
    }

    setSearchParams(params, { replace: true });
  }, [
    activeTab,
    moviePagination,
    actorPagination,
    selectedGenres,
    selectedCountries,
    selectedMovieType,
    setSearchParams,
    searchParams,
  ]);

  // Reset pagination when filters change
  useEffect(() => {
    setMoviePagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [selectedGenres, selectedCountries, selectedMovieType]);

  // Handle movie pagination change
  const handleMoviePageChange = (page, pageSize) => {
    setMoviePagination({
      page,
      size: pageSize,
    });
  };

  // Handle actor pagination change
  const handleActorPageChange = (page, pageSize) => {
    setActorPagination({
      page,
      size: pageSize,
    });
  };

  // Tab change handler
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Handle movie type change
  const handleMovieTypeChange = (newMovieType) => {
    setSelectedMovieType(newMovieType);
  };

  // Handle country change
  const handleCountryChange = (countries) => {
    setSelectedCountries(countries);
  };

  // Handle genre change
  const handleGenreChange = (genres) => {
    setSelectedGenres(genres);
  };

  const movies = movieData?.data?.result || [];
  const actors = actorData?.data?.result || [];
  const totalMovies = movieData?.data?.meta?.totalElements || 0;
  const totalActors = actorData?.data?.meta?.totalElements || 0;

  return (
    <div className="mx-auto mt-24 w-full max-w-screen-2xl px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5">
      <div className="mb-8">
        <p className="mb-3 text-2xl font-medium text-white">
          Kết quả tìm kiếm "{searchQuery}"
        </p>
      </div>

      {activeTab === "movie" && (
        <div className="mb-6">
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
        </div>
      )}

      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type="card"
        items={[
          {
            key: "movie",
            label: `Phim (${isMovieSuccess ? totalMovies : "..."})`,
            children: (
              <div>
                {isMovieLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <Spin size="large" />
                  </div>
                ) : movies.length === 0 ? (
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
                  <>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-6 xl:grid-cols-8">
                      {movies.map((movie) => (
                        <MovieCard
                          key={movie.movieId}
                          movie={movie}
                          variant="default"
                        />
                      ))}
                    </div>

                    {totalMovies > moviePagination.size && (
                      <div className="mt-7 flex justify-center">
                        <Pagination
                          current={moviePagination.page}
                          pageSize={moviePagination.size}
                          total={totalMovies}
                          onChange={handleMoviePageChange}
                          showQuickJumper
                          className="custom-pagination"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ),
          },
          {
            key: "actor",
            label: `Diễn viên (${isActorSuccess ? totalActors : "..."})`,
            children: (
              <div>
                {isActorLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <Spin size="large" />
                  </div>
                ) : actors.length === 0 ? (
                  <div className="mt-10 flex items-center justify-center">
                    <Empty
                      description={
                        <p className="text-lg font-bold text-white">
                          Không tìm thấy diễn viên
                        </p>
                      }
                      className="!text-white"
                    />
                  </div>
                ) : (
                  <>
                    {/* <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                      {actors.map((actor) => (
                        <div
                          key={actor.actorId}
                          className="cursor-pointer rounded-lg bg-dark-100 p-4 transition-all hover:bg-dark-200"
                          onClick={() =>
                            (window.location.href = `/dien-vien/${actor.actorId}`)
                          }
                        >
                          <div className="mb-3 flex justify-center">
                            <img
                              src={actor.avatarUrl}
                              alt={actor.name}
                              className="h-32 w-32 rounded-full object-cover"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium text-white">
                              {actor.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div> */}
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                      {actors.map((actor) => (
                        <Link
                          to={`/dien-vien/${actor.id}`}
                          key={actor.actorId}
                          className="relative hover:brightness-75"
                        >
                          <ImageWithPlaceholder
                            src={actor.avatarUrl}
                            alt={actor.actorName}
                            preview={false}
                            className="aspect-[3/4] rounded-xl object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-2 py-2 text-center">
                            <p className="text-center font-bold text-white">
                              {actor.name}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {totalActors > actorPagination.size && (
                      <div className="mt-7 flex justify-center">
                        <Pagination
                          current={actorPagination.page}
                          pageSize={actorPagination.size}
                          total={totalActors}
                          onChange={handleActorPageChange}
                          showQuickJumper
                          className="custom-pagination"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default SearchResults;
