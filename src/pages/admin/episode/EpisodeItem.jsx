import { Card, Button } from "antd";

const EpisodeItem = ({
  episode,
  handleOpenViewDetailEpisodeModal,
  handleOpenDeleteEpisodeModal,
}) => {
  return (
    <div>
      <Card
        key={episode.id}
        className="border border-gray-700 bg-dark-100 shadow-md transition-all hover:border-gray-500"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
              {episode.episodeNumber}
            </div>
            <div>
              <div className="text-lg font-semibold">{` ${episode.title}`}</div>
              <div className="text-sm text-gray-400">
                Thời lượng: {episode.duration} phút
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              color="primary"
              variant="solid"
              className="text-white hover:text-yellow-400"
              onClick={() =>
                handleOpenViewDetailEpisodeModal({ episodeId: episode.id })
              }
            >
              Chi tiết
            </Button>
            <Button
              color="danger"
              variant="solid"
              className="text-white hover:text-red-500"
              onClick={() =>
                handleOpenDeleteEpisodeModal({ episodeId: episode.id })
              }
            >
              Xóa
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EpisodeItem;
