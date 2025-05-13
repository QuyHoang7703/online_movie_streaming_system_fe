import React, { useState } from "react";
import { Button, Card, Tooltip, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import GenericModal from "@context/GenericModal";
import EpisodeFormInfo from "./EpisodeFormInfo";
import ConfirmDeleteModal from "@pages/admin/ConfirmDeleteModal";

const EpisodeManagement = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  // Mock data for episodes
  const [episodes, setEpisodes] = useState([
    { id: 1, episodeNumber: 1, title: "Khởi đầu cuộc hành trình" },
    { id: 2, episodeNumber: 2, title: "Gặp gỡ những người bạn mới" },
    { id: 3, episodeNumber: 3, title: "Thử thách đầu tiên" },
    { id: 4, episodeNumber: 4, title: "Kẻ thù xuất hiện" },
    { id: 5, episodeNumber: 5, title: "Bí mật được hé lộ" },
  ]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 5,
  });

  const [modalContent, setModalContent] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleChangePage = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
    });
  };

  // function handle delete episode
  const handleDeleteEpisode = ({ episodeId }) => {
    setIsDeleteLoading(true);
    // Simulate API call
    setTimeout(() => {
      setEpisodes(episodes.filter((episode) => episode.id !== episodeId));
      setIsDeleteLoading(false);
    }, 1000);
  };

  // Open modal delete episode
  const handleOpenModalDelete = (episodeId) => {
    setModalContent({
      title: "Xóa tập phim",
      open: true,
      onCancel: () => setModalContent(null),
      Component: ConfirmDeleteModal,
      componentProps: {
        itemType: "Tập phim",
        onConfirm: () => {
          handleDeleteEpisode({ episodeId, movieId });
          setModalContent(null);
        },
        onCancel: () => setModalContent(null),
      },
    });
  };

  const handleOpenModalCreateOrUpdate = ({
    isUpdate = false,
    movieId = null,
    episodeId = null,
  } = {}) => {
    setModalContent({
      title: isUpdate ? "Cập nhập tập phim" : "Thêm tập phim",
      open: true,
      onCancel: () => setModalContent(null),
      Component: EpisodeFormInfo,
      width: 800,
      componentProps: {
        isUpdate,
        movieId,
        episodeId,
        onSuccess: () => {
          setModalContent(null);
        },
        onCancel: () => setModalContent(null),
      },
    });
  };

  return (
    <div className="h-full bg-dark-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Button
            type="default"
            onClick={() => navigate(`/admin/movies/update/SERIES/${movieId}`)}
            className="mr-3"
          >
            Quay lại
          </Button>
          <span className="text-xl font-bold text-white">
            Danh sách tập phim
          </span>
        </div>
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          className="btn-create"
          onClick={() =>
            handleOpenModalCreateOrUpdate({
              isUpdate: false,
              movieId,
            })
          }
        >
          Thêm tập mới
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {episodes?.length > 0 &&
          episodes?.map((episode) => (
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
                    <div className="text-lg font-semibold">{`Tập ${episode.episodeNumber}: ${episode.title}`}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip title="Sửa tập phim">
                    <Button
                      color="primary"
                      variant="solid"
                      icon={<EditOutlined />}
                      className="text-white hover:text-yellow-400"
                      onClick={() =>
                        handleOpenModalCreateOrUpdate({
                          isUpdate: true,
                          episodeId: episode.id,
                        })
                      }
                    >
                      Sửa
                    </Button>
                  </Tooltip>
                  <Tooltip title="Xóa tập phim">
                    <Button
                      color="danger"
                      variant="solid"
                      icon={<DeleteOutlined />}
                      className="text-white hover:text-red-500"
                      onClick={() => handleOpenModalDelete(episode.id)}
                      loading={isDeleteLoading}
                    >
                      Xóa
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}

        {episodes.length === 0 && (
          <div className="my-10 rounded-lg border border-dashed border-gray-700 p-10 text-center text-gray-400">
            <p className="text-lg">Chưa có tập phim nào. Hãy thêm tập mới!</p>
            <Button
              color="primary"
              type="primary"
              icon={<PlusCircleFilled />}
              onClick={() =>
                handleOpenModalCreateOrUpdate({ isUpdate: false, movieId })
              }
            >
              Thêm tập mới
            </Button>
          </div>
        )}
      </div>

      {/* Phân trang */}
      {pagination.total > 0 && (
        <div className="mt-5 flex justify-center">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handleChangePage}
            showSizeChanger
            pageSizeOptions={["5", "10", "20"]}
            className="custom-pagination"
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} / ${total} tập phim`
            }
          />
        </div>
      )}
      {modalContent && <GenericModal {...modalContent} />}
    </div>
  );
};

export default EpisodeManagement;
