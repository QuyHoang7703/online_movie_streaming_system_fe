const MovieGenres = ({ genres }) => {
  return (
    <div className="mb-3 flex items-center gap-4">
      {(genres || []).map((genre) => (
        <span
          className="rounded-md border-2 border-white/30 bg-gray-500/30 p-1 text-[0.8vw] text-white hover:text-mainColor"
          key={genre.id}
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};
export default MovieGenres;
