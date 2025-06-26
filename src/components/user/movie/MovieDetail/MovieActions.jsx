import { HeartFilled, MessageFilled, PlusOutlined } from "@ant-design/icons";
import ActionButton from "@components/common/ActionButton";
import { useFavoriteMovie } from "@hooks/useFavoriteMovie";
import WatchButton from "@components/user/movie/WatchButton";
import { useDefaultEpisode } from "@hooks/useDefaultEpisode";
import { Modal, Rate } from "antd";
import "@styles/styles.css";
import { useEffect, useState } from "react";
import {
  useAddHistoryViewMutation,
  useCreateUserInteractionMutation,
  useGetUserInteractionQuery,
  useUpdateUserInteractionMutation,
} from "@service/userInteractionApi";
import { useNotification } from "@hooks/useNotification";

const MovieActions = ({
  movieId,
  isFavorite,
  movieDetail,
  episodeId,
  setChosenEpisode,
}) => {
  const { toggleFavorite, isProcessing } = useFavoriteMovie();
  const { defaultEpisodeId } = useDefaultEpisode(movieDetail);

  // State để lưu trữ đánh giá ĐÃ XÁC NHẬN hiện tại
  const [currentRating, setCurrentRating] = useState(0);

  // State để điều khiển việc hiển thị Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State để lưu trữ giá trị sao mà người dùng đã chọn TẠM THỜI (trước khi xác nhận)
  const [tempRating, setTempRating] = useState(0);

  const { showNotification } = useNotification();

  const userInteractionResponse = useGetUserInteractionQuery(movieId);
  useEffect(() => {
    if (userInteractionResponse.isSuccess) {
      setCurrentRating(userInteractionResponse.data.data.ratingValue);
    }
  }, [userInteractionResponse, setCurrentRating]);

  const [createUserInteraction, { isLoading: _isCreating }] =
    useCreateUserInteractionMutation();

  const [updateUserInteraction, { isLoading: _isUpdating }] =
    useUpdateUserInteractionMutation();

  const [addHistoryView, { isLoading: _isAddingHistoryView }] =
    useAddHistoryViewMutation();

  // Hàm xử lý khi người dùng thay đổi đánh giá trên Rate (sẽ kích hoạt modal)
  const handleRateChange = (value) => {
    setTempRating(value);

    setIsModalVisible(true); // Hiển thị Modal
  };

  const handleAddHistoryView = async () => {
    try {
      await addHistoryView({ movieId }).unwrap();
      console.log("addHistoryView success");
    } catch (error) {
      console.log("addHistoryView error");
      console.log(error);
    }
  };

  // Hàm xử lý khi người dùng nhấn "Đồng ý" trong Modal
  const handleOk = async () => {
    console.log(`Người dùng đã xác nhận đánh giá: ${tempRating} sao`);
    try {
      let response;
      if (currentRating > 0) {
        // Nếu đã có rating (currentRating > 0), thì gọi API cập nhật
        response = await updateUserInteraction({
          movieId, // Hoặc userId và movieId tùy thuộc vào API của bạn
          ratingValue: tempRating,
        }).unwrap();
      } else {
        // Nếu chưa có rating, thì gọi API tạo mới
        response = await createUserInteraction({
          ratingValue: tempRating,
          movieId,
        }).unwrap();
      }
      showNotification("success", response.message); // Sử dụng response.message
      setCurrentRating(tempRating); // Cập nhật rating hiển thị ngay sau khi thành công
    } catch {
      // Đảm bảo rằng bạn truy cập đúng thuộc tính message của error
      showNotification("error", "Bạn cần đăng nhập để đánh giá phim");
    } finally {
      setIsModalVisible(false); // Đóng Modal sau khi xử lý xong (dù thành công hay thất bại)
    }
  };

  // Hàm xử lý khi người dùng nhấn "Hủy" hoặc đóng Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Hàm xử lý scroll đến phần bình luận
  const handleScrollToComment = () => {
    const commentSection = document.getElementById("comment-section");
    if (commentSection) {
      commentSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-10 pr-5">
      <div className="flex items-center gap-5">
        <WatchButton
          movieDetail={movieDetail}
          episodeId={episodeId || defaultEpisodeId}
          setChosenEpisode={setChosenEpisode}
          variant="action"
          movieType={movieDetail.movieType}
          movieId={movieId}
          handleAddHistoryView={handleAddHistoryView}
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
            icon={<MessageFilled className="text-xl" />}
            text="Bình luận"
            link="#"
            onClick={handleScrollToComment}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-white">
          {currentRating > 0
            ? ` Đánh giá ${currentRating}/5 sao`
            : "Chưa có đánh giá"}
        </p>
        <Rate allowHalf value={currentRating} onChange={handleRateChange} />

        {/* Modal xác nhận đánh giá */}
        <Modal
          title="Xác nhận đánh giá"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Đồng ý"
          cancelText="Hủy bỏ"
          centered
        >
          <p className="text-md text-white">
            Bạn có muốn đánh giá phim này{" "}
            {tempRating > 0 ? `${tempRating}⭐ ` : "chưa có sao nào"} không?
          </p>
        </Modal>
      </div>
    </div>
  );
};
export default MovieActions;
