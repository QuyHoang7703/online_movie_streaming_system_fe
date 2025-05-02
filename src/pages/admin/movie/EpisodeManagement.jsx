import React, { useState, useEffect, Component } from "react";
import { Button, Card, Tooltip, Spin, Pagination } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlayCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import FormField from "@components/FormField";
import { useGetEpisodesQuery } from "@service/admin/episodeApi";
import { useEpisodeMutations } from "@hooks/useEpisodeMutations";
import ConfirmDeleteModal from "@pages/admin/ConfirmDeleteModal";
import GenericModal from "@context/GenericModal";
import EpisodeFormInfo from "./EpisodeFormInfo";

const EpisodeManagement = () => {
  const { movieId } = useParams();
  console.log({ movieId });
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [modalContent, setModalContent] = useState(null);

  const params = {
    seriesMovieId: movieId,
    page: pagination.current,
    size: pagination.pageSize,
  };

  const episodeData = useGetEpisodesQuery(params);
  console.log({ episodeData });

  // Get episodes data
  useEffect(() => {
    if (episodeData.isSuccess && episodeData?.data?.data) {
      const { result, meta } = episodeData.data.data;
      setEpisodes(result || []);
      setPagination({
        current: meta.currentPage,
        pageSize: meta.pageSize,
        total: meta.totalElements,
      });
    }
  }, [episodeData]);

  const handleChangePage = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
    });
  };

  // function handle delete episode
  const { handleDeleteEpisode, isDeleteLoading } = useEpisodeMutations();
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
            {/* Danh sách tập phim: {seriesInfo.title} */}
          </span>
        </div>
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          // onClick={() => handleOpenModal()}
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

      {episodeData.isLoading && (
        <div className="my-8 flex justify-center">
          <Spin size="large" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {episodes?.length > 0 &&
          episodes?.map((episode) => (
            <Card
              key={episode.id}
              className="border border-gray-700 bg-dark-100 shadow-md transition-all hover:border-gray-500"
              // bodyStyle={{ padding: "16px" }}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                    {episode.episodeNumber}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{`Tập ${episode.episodeNumber}: ${episode.title}`}</div>
                    {/* <div className="text-sm text-gray-400">
                      Video URL: {episode.videoUrl} 
                    </div> */}
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

        {episodes.length === 0 && !episodeData.isLoading && (
          <div className="my-10 rounded-lg border border-dashed border-gray-700 p-10 text-center text-gray-400">
            <p className="text-lg">Chưa có tập phim nào. Hãy thêm tập mới!</p>
            <Button
              color="primary"
              type="primary"
              icon={<PlusCircleOutlined />}
              // onClick={() => handleOpenModal()}
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
