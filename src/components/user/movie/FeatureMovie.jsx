import {
  PlayCircleFilled,
  HeartOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Tag } from "antd";

const FeatureMovie = () => {
  return (
    <div className="relative">
      {/* Banner phim */}
      <div className="relative">
        <img
          src="https://image.tmdb.org/t/p/original/ybBIIzDL1B9yH8OVFav81JTZmoN.jpg"
          alt="Đầu xuôi đuôi đứt lớt"
          className="aspect-[16/8] w-full brightness-[0.7]"
        />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 flex w-full justify-between bg-gradient-to-t from-black/80 to-transparent p-10">
          <div className="hidden max-w-2xl sm:block">
            {/* Tiêu đề phim */}
            <h1 className="mb-2 text-5xl font-bold text-white/80">
              ĐẦU XUÔI ĐUÔI ĐỨT LỚT
            </h1>
            <div className="mb-2 text-mainUserColor-100">Lobby</div>

            {/* Tags và thông tin */}
            <div className="mb-4 flex items-center gap-3">
              <Tag className="!text-blac !border-none !bg-mainUserColor-100 p-1">
                IMDb 5.7
              </Tag>
              <Tag className="!border-none !bg-gray-700 p-1 !text-white">
                T16
              </Tag>
              <Tag className="!border-none !bg-gray-700 p-1 !text-white">
                2025
              </Tag>
              <Tag className="!border-none !bg-gray-700 p-1 !text-white">
                1h 46m
              </Tag>
            </div>

            {/* Thể loại */}
            <div className="mb-3 flex items-center gap-4">
              <span className="rounded-md border-2 border-white/30 bg-gray-500/30 p-1 text-white hover:text-mainColor">
                Chính Kịch
              </span>
              <span className="rounded-md border-2 border-white/30 bg-gray-500/30 p-1 text-white hover:text-mainColor">
                Chiếu Rạp
              </span>
              <span className="rounded-md border-2 border-white/30 bg-gray-500/30 p-1 text-white hover:text-mainColor">
                Hài
              </span>
              <span className="rounded-md border-2 border-white/30 bg-gray-500/30 p-1 text-white hover:text-mainColor">
                Tâm lý
              </span>
            </div>

            {/* Mô tả */}
            <p className="mb-6 max-w-3xl text-gray-300">
              Yoon Chang Wook - CEO một công ty công nghệ nhỏ, giỏi nghiên cứu
              nhưng mù tịt chuyện thương trường. Khi công ty sắp sập tiệm vì bị
              "bạn thân" cố Son Gwang-woo đâm sau lưng bằng chiêu trò đứt lớt để
              giành lấy dự án quốc gia, Chang-wook buộc...
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                icon={<PlayCircleFilled />}
                size="large"
                className="!flex !items-center !rounded-full !border-none !bg-mainUserColor-100 !px-6 !font-medium !text-black hover:!opacity-90"
              >
                Xem Phim
              </Button>

              <Button
                icon={<HeartOutlined />}
                size="large"
                type="text"
                shape="circle"
                className="!flex !items-center !justify-center !bg-gray-800/80 !text-white hover:!bg-gray-700"
              />
              <Button
                icon={<InfoCircleOutlined />}
                size="large"
                type="text"
                shape="circle"
                className="!flex !items-center !justify-center !bg-gray-800/80 !text-white hover:!bg-gray-700"
              />
            </div>
          </div>
          {/* Thumbnails */}
          <div className="mt-4 flex items-end justify-end gap-2 px-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`h-14 w-24 overflow-hidden rounded-md border-2 ${num === 1 ? "border-mainColor" : "border-transparent"}`}
              >
                <img
                  src={`https://picsum.photos/id/${num + 40}/200/120`}
                  alt={`Thumbnail ${num}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureMovie;
