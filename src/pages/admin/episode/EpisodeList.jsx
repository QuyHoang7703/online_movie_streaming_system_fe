import EpisodeItem from "@pages/admin/episode/EpisodeItem";
import { Empty } from "antd";

const EpisodeList = ({
  episodes,
  handleOpenViewDetailEpisodeModal,
  handleOpenDeleteEpisodeModal,
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      {episodes.length > 0 ? (
        episodes.map((episode) => (
          <EpisodeItem
            key={episode.id}
            episode={episode}
            handleOpenViewDetailEpisodeModal={handleOpenViewDetailEpisodeModal}
            handleOpenDeleteEpisodeModal={handleOpenDeleteEpisodeModal}
          />
        ))
      ) : (
        <div className="my-10 rounded-lg border border-dashed border-gray-700 p-10 text-center text-gray-400">
          <Empty description="Không có dữ liệu" />
        </div>
      )}
      {/* {modalContent && <GenericModal {...modalContent} />} */}
    </div>
  );
};

export default EpisodeList;
