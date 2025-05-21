import { HeartFilled, MessageFilled, PlusOutlined } from "@ant-design/icons";
import ActionButton from "@components/common/ActionButton";
import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import WatchButton from "@components/user/movie/WatchButton";
import { useDefaultEpisode } from "@hooks/useDefaultEpisode";

const MovieActions = ({
  movieId,
  isFavorite,
  movieDetail,
  episodeId,
  setChosenEpisode,
}) => {
  const { toggleFavorite, isProcessing } = useFavoriteMovie();
  const { defaultEpisodeId } = useDefaultEpisode(movieDetail);

  console.log("MovieActions - episodeId:", episodeId);
  console.log("MovieActions - defaultEpisodeId:", defaultEpisodeId);

  return (
    <div className="flex items-center gap-10">
      <WatchButton
        movieDetail={movieDetail}
        episodeId={episodeId || defaultEpisodeId}
        setChosenEpisode={setChosenEpisode}
        variant="action"
        movieType={movieDetail.movieType}
        movieId={movieId}
      />
      <div className="flex gap-5">
        <ActionButton
          icon={<HeartFilled className="text-xl" />}
          text={isFavorite ? "Đã thích" : "Yêu thích"}
          link="#"
          className={`${isFavorite ? "!text-mainUserColor-200" : ""}`}
          loading={isProcessing}
          onClick={() => toggleFavorite({ movieId, isFavorite })}
        />
        <ActionButton
          icon={<PlusOutlined className="text-xl" />}
          text="Thêm vào"
          link="#"
        />
        <ActionButton
          icon={<MessageFilled className="text-xl" />}
          text="Bình luận"
          link="#"
        />
      </div>
    </div>
  );
};
export default MovieActions;
