import { Button } from "antd";
import { useMovieSubscription } from "@hooks/useMovieSubscription";
import GenericModal from "@context/GenericModal";
import { CaretRightFilled, PlayCircleFilled } from "@ant-design/icons";
import { useDefaultEpisode } from "@hooks/useDefaultEpisode";

/**
 * Component nút Xem phim tái sử dụng với tính năng kiểm tra quyền xem
 * Hỗ trợ cả hai cách sử dụng:
 * 1. Truyền đầy đủ movieDetail
 * 2. Chỉ truyền movieId và movieType khi không có movieDetail
 *
 * @param {Object} props
 * @param {Object} props.movieDetail - Chi tiết phim (tùy chọn)
 * @param {string} props.episodeId - ID tập phim (tùy chọn, cho phim bộ)
 * @param {string} props.movieId - ID phim (dùng khi không có movieDetail)
 * @param {string} props.movieType - Loại phim (dùng khi không có movieDetail)
 * @param {function} props.setChosenEpisode - Hàm cập nhật tập đã chọn (tùy chọn)
 * @param {string} props.size - Kích thước nút ('small', 'middle', 'large')
 * @param {string} props.type - Loại nút ('default', 'primary', 'link', etc.)
 * @param {string} props.className - Các lớp CSS bổ sung
 * @param {string} props.text - Văn bản nút (mặc định dựa vào variant)
 * @param {string} props.variant - Biến thể nút ('default', 'action', 'preview')
 */
const WatchButton = ({
  movieDetail,
  episodeId,
  movieId,
  movieType,
  setChosenEpisode,
  size = "middle",
  type = "primary",
  className = "",
  text,
  variant = "default", // 'default', 'action', 'preview'
}) => {
  const { modalContent, handleWatchMovie } = useMovieSubscription();

  // Lấy episodeId mặc định nếu không được cung cấp
  const { defaultEpisodeId } = useDefaultEpisode({
    movieDetail,
    movieId,
    movieType,
  });

  // Sử dụng episodeId được cung cấp hoặc mặc định
  const actualEpisodeId = episodeId || defaultEpisodeId;

  // Cấu hình giao diện nút dựa trên variant
  let buttonProps = {};
  let buttonText = text;

  switch (variant) {
    case "action":
      buttonProps = {
        size: "large",
        icon: <CaretRightFilled className="relative top-[1px] text-2xl" />,
        className: `!flex !items-center !gap-2 !rounded-full !border-none !bg-mainUserColor-100 !p-7 text-xl !font-medium !text-black hover:!opacity-90 ${className}`,
      };
      buttonText = buttonText || "Xem Ngay";
      break;
    case "preview":
      buttonProps = {
        icon: <PlayCircleFilled />,
        size: "middle",
        className: `!flex !items-center !rounded-full !border-none !bg-mainUserColor-100 !p-3 !font-medium !text-black hover:!opacity-90 ${className}`,
      };
      buttonText = buttonText || "Xem Phim";
      break;
    default:
      buttonProps = {
        icon: <PlayCircleFilled />,
        size,
        type,
        className: `flex items-center gap-1 ${className}`,
      };
      buttonText = buttonText || "Xem phim";
  }

  const handleClick = () => {
    handleWatchMovie({
      movieDetail,
      episodeId: actualEpisodeId,
      setChosenEpisode,
      movieId,
      movieType,
    });
  };

  return (
    <>
      <Button {...buttonProps} onClick={handleClick}>
        {buttonText}
      </Button>
      {modalContent && <GenericModal {...modalContent} />}
    </>
  );
};

export default WatchButton;
