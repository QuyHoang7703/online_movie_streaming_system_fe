import { Image } from "antd";

const MovieActors = ({ movieActors = [], isDetail = false }) => {
  return (
    <div className="mt-14">
      {!isDetail && (
        <p className="mb-3 text-2xl font-bold text-white">Diễn viên</p>
      )}
      <div
        className={`grid gap-6 p-5 ${
          isDetail
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-3"
        }`}
      >
        {movieActors.map((actor) => (
          <div
            key={actor.actorId}
            className={`relative overflow-hidden ${
              isDetail ? "w-[90%] rounded-xl shadow-lg" : "text-center"
            }`}
          >
            <Image
              src={actor.avatarUrl}
              alt="avatarUrl"
              preview={false}
              className={`object-cover ${
                isDetail
                  ? "aspect-[3/4] rounded-xl" // hình chữ nhật
                  : "!h-[90px] !w-[90px] rounded-full object-cover" // hình tròn
              }`}
              fallback="https://via.placeholder.com/60x60?text=No+Image"
            />

            {isDetail ? (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-2 py-2 text-center">
                <p className="mb-1 truncate text-sm font-medium text-white">
                  {actor.actorName}
                </p>
                <p className="truncate text-xs text-red-300">
                  {actor.characterName}
                </p>
              </div>
            ) : (
              <>
                <p className="mt-2 text-center text-white hover:text-mainColor">
                  <a href="">{actor.actorName}</a>
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieActors;
