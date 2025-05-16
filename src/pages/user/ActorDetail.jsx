import MovieCard from "@components/user/movie/MovieCard";
import { GENDER_MAP } from "@consts/genderMap";
import { useLoading } from "@context/LoadingContext";
import { useGetDetailActorQuery } from "@service/admin/actorApi";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActorDetail = () => {
  const { actorId } = useParams();
  const { data: actorResponse, isLoading } = useGetDetailActorQuery({
    actorId,
  });
  const actorDetail = actorResponse?.data;
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (isLoading) showLoading();
    else hideLoading();
  }, [isLoading, showLoading, hideLoading]);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 700;

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Cắt chuỗi nếu chưa expand
  const displayedBiography = isExpanded
    ? actorDetail?.biography
    : actorDetail?.biography?.slice(0, maxLength);

  return (
    <div className="mx-auto mt-24 max-w-screen-xl px-2 py-6 text-white">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        {/* Cột trái chứa hình ảnh và thông tin cá nhân của diễn viên */}
        <div className="flex h-full w-full flex-col justify-center gap-10 md:flex-1">
          <div className="min-h-[50vh]">
            <Image
              src={actorDetail?.avatarUrl}
              alt={actorDetail?.actorName}
              preview={false}
              className="aspect-[3/4] w-full max-w-sm rounded-xl object-cover hover:brightness-75"
            />
          </div>
          <div>
            <p className="text-xl font-bold">Thông tin cá nhân</p>
            <div className="mt-4 flex flex-col gap-5">
              <div className="flex flex-col gap-2 text-base">
                <p className="font-semibold">Ngày sinh</p>
                <p className="text-gray-400">
                  {actorDetail?.birthDate || "Đang cập nhật"}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-base">
                <p className="font-semibold">Nơi sinh</p>
                <p className="text-gray-400">
                  {actorDetail?.placeOfBirth || "Đang cập nhật"}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-base">
                <p className="font-semibold">Giới tính </p>
                <p className="text-gray-400">
                  {GENDER_MAP[actorDetail?.gender] || "Đang cập nhật"}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-base">
                <p className="font-semibold">Tên khác </p>
                <div className="flex flex-col gap-1 text-gray-400">
                  {actorDetail?.otherName
                    ? actorDetail.otherName
                        // Bước 1: loại bỏ dấu " đầu cuối
                        .replace(/^"|"$/g, "")
                        // Bước 2: split theo dấu ,
                        .split('","')
                        // Bước 3: map ra từng dòng
                        .map((name, index) => <p key={index}>{name}</p>)
                    : "Đang cập nhật"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải chứa tiểu sử và các phim đã tham gia */}
        <div className="flex h-full flex-col gap-10 md:flex-[4]">
          <div className="min-h-[50vh]">
            <p className="mb-4 text-2xl font-bold">{actorDetail?.name}</p>
            <p className="mb-2 text-xl font-semibold">Tiểu sử</p>
            <p className="whitespace-pre-line text-base">
              {displayedBiography || "Đang cập nhật"}
            </p>
            {actorDetail?.biography?.length > maxLength && (
              <button
                onClick={toggleExpand}
                className="mt-3 text-blue-400 hover:underline"
              >
                {isExpanded ? "Rút gọn" : "Xem thêm"}
              </button>
            )}
          </div>
          <div>
            <p className="mb-4 text-xl font-bold">Các phim đã tham gia</p>
            <div className="grid grid-cols-6 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {actorDetail?.movies?.map((movie) => (
                <MovieCard
                  key={movie.movieId}
                  movie={movie}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
