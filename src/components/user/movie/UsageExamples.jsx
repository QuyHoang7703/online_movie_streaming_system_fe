import UnifiedMovieCard from "./UnifiedMovieCard";

// Example usage of the unified component
const UsageExamples = () => {
  // Sample movie data
  const sampleMovie = {
    id: 123,
    title: "Phim mẫu",
    englishTitle: "Sample Movie",
    poster: "https://example.com/poster.jpg",
    subtitled: "Vietsub",
    episodes: "10/12",
    type: "16",
    season: "2",
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold text-white">
        Ví dụ sử dụng UnifiedMovieCard
      </h2>

      <div className="mb-8">
        <h3 className="text-md mb-2 font-semibold text-white">
          1. Sử dụng như MovieCard thông thường:
        </h3>
        <div className="w-48">
          <UnifiedMovieCard movie={sampleMovie} />
        </div>
      </div>

      <div>
        <h3 className="text-md mb-2 font-semibold text-white">
          2. Sử dụng như HotMovieCard:
        </h3>
        <div className="w-48">
          <UnifiedMovieCard
            movie={sampleMovie}
            variant="hot"
            rank={1}
            index={0}
          />
        </div>
      </div>
    </div>
  );
};

export default UsageExamples;
