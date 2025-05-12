import MovieActions from "@components/user/movie/MovieDetail/MovieActions";
import MovieActors from "@components/user/movie/MovieDetail/MovieActors";

import MovieInformation from "@components/user/movie/MovieDetail/MovieInformation";
import MovieTabs from "@components/user/movie/MovieDetail/MovieTabs";

const DetailMovie = () => {
  return (
    <div className="bg-dark-400">
      <div className="relative h-[calc(100vh-50px)] min-h-[500px] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 w-full">
          <img
            src="https://image.tmdb.org/t/p/original/bVm6udIB6iKsRqgMdQh6HywuEBj.jpg"
            alt="Feature movie"
            className="h-full w-full object-cover brightness-50"
          />
        </div>
      </div>
      <div className="flex">
        <div className="shadow-3xl w-[450px] flex-none overflow-auto rounded-[3rem] border-r-[1px] border-gray-700 bg-dark-400 p-10">
          <MovieInformation />
          <MovieActors />
        </div>
        <div className="flex-1 rounded-[3rem] p-8 text-white">
          <MovieActions />
          <div className="mt-8">
            <MovieTabs />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailMovie;
