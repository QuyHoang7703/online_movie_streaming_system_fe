import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Input,
  Modal,
  Form,
  message,
  Tooltip,
  Spin,
  Pagination,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import FormField from "@components/FormField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Giả lập API service
const useEpisodeService = () => {
  // Trong thực tế, thay thế bằng API calls thật
  const fetchEpisodes = (seriesId, page = 1, pageSize = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Tạo dữ liệu mẫu nhiều tập phim để test phân trang
        const mockData = Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          episodeNumber: i + 1,
          name: `Tập ${i + 1}: ${["Khởi đầu", "Hành trình", "Cuộc gặp gỡ", "Thử thách", "Đối đầu"][i % 5]} ${Math.floor(i / 5) + 1}`,
          videoUrl: `https://example.com/ep${i + 1}`,
        }));

        // Tính toán phân trang
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = mockData.slice(startIndex, endIndex);

        resolve({
          data: {
            data: paginatedData,
            meta: {
              currentPage: page,
              pageSize: pageSize,
              totalElements: mockData.length,
              totalPages: Math.ceil(mockData.length / pageSize),
            },
          },
        });
      }, 500);
    });
  };

  const addEpisode = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ghi log dữ liệu giả lập để hiển thị dữ liệu đã được sử dụng
        console.log("Thêm tập phim với dữ liệu:", data);
        resolve({ success: true, message: "Thêm tập phim thành công!" });
      }, 500);
    });
  };

  const updateEpisode = (id, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ghi log dữ liệu giả lập để hiển thị dữ liệu đã được sử dụng
        console.log(`Cập nhật tập phim ID ${id} với dữ liệu:`, data);
        resolve({ success: true, message: "Cập nhật tập phim thành công!" });
      }, 500);
    });
  };

  const deleteEpisode = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ghi log dữ liệu giả lập để hiển thị dữ liệu đã được sử dụng
        console.log(`Xóa tập phim ID ${id}`);
        resolve({ success: true, message: "Xóa tập phim thành công!" });
      }, 500);
    });
  };

  return { fetchEpisodes, addEpisode, updateEpisode, deleteEpisode };
};

// Schema validation
const episodeSchema = yup.object().shape({
  episodeNumber: yup
    .number()
    .required("Số tập không được để trống")
    .positive("Số tập phải là số dương"),
  name: yup.string().required("Tên tập không được để trống"),
  videoUrl: yup.string().when("isUpload", {
    is: false,
    then: (schema) =>
      schema.required("URL video không được để trống").url("URL không hợp lệ"),
    otherwise: (schema) => schema.nullable(),
  }),
  videoFile: yup.mixed().when("isUpload", {
    is: true,
    then: (schema) => schema.required("File video không được để trống"),
    otherwise: (schema) => schema.nullable(),
  }),
});

const Episodes = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Hiển thị 5 tập mỗi trang
    total: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [seriesInfo] = useState({ title: "Tên Series" });
  const episodeService = useEpisodeService();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(episodeSchema),
    defaultValues: {
      episodeNumber: "",
      name: "",
      videoUrl: "",
      videoFile: null,
      isUpload: false,
    },
  });

  const isUpload = watch("isUpload");

  useEffect(() => {
    loadEpisodes(pagination.current, pagination.pageSize);
  }, [seriesId]);

  const loadEpisodes = async (page = 1, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await episodeService.fetchEpisodes(
        seriesId,
        page,
        pageSize,
      );
      setEpisodes(response.data.data);
      setPagination({
        current: response.data.meta.currentPage,
        pageSize: response.data.meta.pageSize,
        total: response.data.meta.totalElements,
      });
    } catch (error) {
      message.error("Không thể tải danh sách tập phim");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (page, pageSize) => {
    loadEpisodes(page, pageSize);
  };

  const handleOpenModal = (episode = null) => {
    if (episode) {
      setCurrentEpisode(episode);
      setValue("episodeNumber", episode.episodeNumber);
      setValue("name", episode.name);
      setValue("videoUrl", episode.videoUrl);
      setValue("isUpload", false);
      setValue("videoFile", null);
    } else {
      setCurrentEpisode(null);
      // Tính số tập tiếp theo dựa trên tổng số tập
      const nextEpisodeNumber = pagination.total + 1;
      reset({
        episodeNumber: nextEpisodeNumber,
        name: "",
        videoUrl: "",
        videoFile: null,
        isUpload: false,
      });
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    reset();
  };

  const handleSaveEpisode = async (data) => {
    setLoading(true);
    try {
      // Trong thực tế, cần xử lý upload file nếu data.isUpload = true
      // và sử dụng data.videoFile để tải lên
      // Đây là demo UI nên chỉ giả lập

      if (data.isUpload && data.videoFile) {
        // Simulate file upload process
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Trong thực tế, server sẽ trả về URL của video sau khi upload
        data.videoUrl = `https://example.com/uploads/${data.videoFile.name}`;
      }

      if (currentEpisode) {
        await episodeService.updateEpisode(currentEpisode.id, data);
        message.success("Cập nhật tập phim thành công!");
      } else {
        await episodeService.addEpisode({ ...data, seriesId });
        message.success("Thêm tập phim thành công!");
      }

      // Tải lại trang hiện tại sau khi thêm/sửa
      loadEpisodes(pagination.current, pagination.pageSize);
      handleCloseModal();
    } catch (error) {
      message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (episode) => {
    setCurrentEpisode(episode);
    setConfirmDeleteVisible(true);
  };

  const handleDelete = async () => {
    if (!currentEpisode) return;

    setLoading(true);
    try {
      await episodeService.deleteEpisode(currentEpisode.id);
      message.success("Xóa tập phim thành công!");

      // Kiểm tra nếu xóa tập cuối cùng trên trang hiện tại
      const isLastItemOnPage = episodes.length === 1;
      const isNotFirstPage = pagination.current > 1;

      // Nếu xóa mục cuối cùng của trang và không phải trang đầu tiên, quay lại trang trước đó
      if (isLastItemOnPage && isNotFirstPage) {
        loadEpisodes(pagination.current - 1, pagination.pageSize);
      } else {
        // Ngược lại, tải lại trang hiện tại
        loadEpisodes(pagination.current, pagination.pageSize);
      }
    } catch (error) {
      message.error("Không thể xóa tập phim");
      console.error(error);
    } finally {
      setLoading(false);
      setConfirmDeleteVisible(false);
    }
  };

  const handleMoveEpisode = (index, direction) => {
    // Trong thực tế, cần gọi API để lưu thứ tự mới
    // Ở đây chỉ cập nhật UI tạm thời
    const newEpisodes = [...episodes];
    const temp = newEpisodes[index];

    if (direction === "up" && index > 0) {
      newEpisodes[index] = newEpisodes[index - 1];
      newEpisodes[index - 1] = temp;
    } else if (direction === "down" && index < newEpisodes.length - 1) {
      newEpisodes[index] = newEpisodes[index + 1];
      newEpisodes[index + 1] = temp;
    }

    setEpisodes(newEpisodes);
    message.info("Thứ tự tập phim đã được thay đổi");
    // Trong thực tế, cần gọi API để lưu thứ tự mới
  };

  return (
    <div className="h-full bg-dark-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Button
            type="default"
            onClick={() => navigate("/admin/movies")}
            className="mr-3"
          >
            Quay lại
          </Button>
          <span className="text-xl font-bold text-white">
            Danh sách tập phim: {seriesInfo.title}
          </span>
        </div>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => handleOpenModal()}
          className="bg-green-600 hover:bg-green-700"
        >
          Thêm tập mới
        </Button>
      </div>

      {loading && (
        <div className="my-8 flex justify-center">
          <Spin size="large" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {episodes.map((episode, index) => (
          <Card
            key={episode.id}
            className="border border-gray-700 bg-dark-100 shadow-md transition-all hover:border-gray-500"
            bodyStyle={{ padding: "16px" }}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
                  {episode.episodeNumber}
                </div>
                <div>
                  <div className="text-lg font-semibold">{episode.name}</div>
                  <div className="text-sm text-gray-400">
                    Video URL: {episode.videoUrl}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Tooltip title="Di chuyển lên">
                  <Button
                    type="text"
                    icon={<ArrowUpOutlined />}
                    disabled={index === 0}
                    onClick={() => handleMoveEpisode(index, "up")}
                    className="text-white hover:text-blue-400"
                  />
                </Tooltip>
                <Tooltip title="Di chuyển xuống">
                  <Button
                    type="text"
                    icon={<ArrowDownOutlined />}
                    disabled={index === episodes.length - 1}
                    onClick={() => handleMoveEpisode(index, "down")}
                    className="text-white hover:text-blue-400"
                  />
                </Tooltip>
                <Tooltip title="Sửa tập phim">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleOpenModal(episode)}
                    className="text-white hover:text-yellow-400"
                  />
                </Tooltip>
                <Tooltip title="Xóa tập phim">
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteConfirm(episode)}
                    className="text-white hover:text-red-500"
                  />
                </Tooltip>
              </div>
            </div>
          </Card>
        ))}

        {episodes.length === 0 && !loading && (
          <div className="my-10 rounded-lg border border-dashed border-gray-700 p-10 text-center text-gray-400">
            <p className="text-lg">Chưa có tập phim nào. Hãy thêm tập mới!</p>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => handleOpenModal()}
              className="mt-4 bg-green-600 hover:bg-green-700"
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

      {/* Modal thêm/sửa tập phim */}
      <Modal
        title={currentEpisode ? "Cập nhật tập phim" : "Thêm tập phim mới"}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        <Form onFinish={handleSubmit(handleSaveEpisode)} layout="vertical">
          <FormField
            control={control}
            name="episodeNumber"
            label="Số tập"
            Component={Input}
            type="number"
            error={errors.episodeNumber?.message}
          />
          <FormField
            control={control}
            name="name"
            label="Tên tập"
            Component={Input}
            error={errors.name?.message}
          />

          <div className="mb-4">
            <div className="mb-2 flex items-center">
              <span className="mr-3 font-medium">Nguồn video:</span>
              <Button
                type={!isUpload ? "primary" : "default"}
                size="small"
                onClick={() => setValue("isUpload", false)}
                className={!isUpload ? "bg-blue-500" : ""}
              >
                URL
              </Button>
              <Button
                type={isUpload ? "primary" : "default"}
                size="small"
                onClick={() => setValue("isUpload", true)}
                className={`ml-2 ${isUpload ? "bg-blue-500" : ""}`}
              >
                Upload
              </Button>
            </div>

            {!isUpload ? (
              <FormField
                control={control}
                name="videoUrl"
                label="URL Video"
                Component={Input}
                error={errors.videoUrl?.message}
                placeholder="Nhập đường dẫn video (http://...)"
              />
            ) : (
              <div className="mb-4">
                <label className="mb-1 block font-medium">File video</label>
                <Form.Item
                  validateStatus={errors.videoFile ? "error" : ""}
                  help={errors.videoFile?.message}
                >
                  <input
                    type="file"
                    accept="video/*"
                    className="w-full rounded border border-gray-300 p-2"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setValue("videoFile", file);
                      }
                    }}
                  />
                </Form.Item>
                <div className="text-xs text-gray-400">
                  Hỗ trợ các định dạng: MP4, WebM, MKV (tối đa 2GB)
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {currentEpisode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={confirmDeleteVisible}
        onCancel={() => setConfirmDeleteVisible(false)}
        onOk={handleDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true, loading: loading }}
      >
        <p>Bạn có chắc chắn muốn xóa tập phim "{currentEpisode?.name}"?</p>
        <p>Hành động này không thể hoàn tác.</p>
      </Modal>
    </div>
  );
};

export default Episodes;
