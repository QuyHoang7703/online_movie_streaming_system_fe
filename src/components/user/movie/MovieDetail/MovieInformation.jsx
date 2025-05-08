import MovieGenres from "@components/user/movie/MovieDetail/MovieGenres";
import MovieTags from "@components/user/movie/MovieDetail/MovieTags";

const MovieInformation = () => {
  return (
    <div className="flex flex-col gap-5 text-white">
      <img
        src="https://static.nutscdn.com/vimg/300-0/6591ac85c0e2c6475caeb282fba760b4.jpg"
        alt=""
        className="h-[240px] w-[160px] rounded-xl"
      />
      <p className="mt-2 text-2xl font-bold text-white">
        Đầu Xuôi Đuôi Đút Lót
      </p>
      <MovieTags
        rating={7.5}
        year={2024}
        duration="1h 46m"
        type="Phim lẻ"
        simple={true}
      />
      <MovieGenres />
      <p className="text-base font-medium">Giới thiệu: </p>
      <p className="text-gray-500">
        Yoon Chang Wook - CEO một công ty công nghệ nhỏ, giỏi nghiên cứu nhưng
        mù tịt chuyện thương trường. Khi công ty sắp sập tiệm vì bị “bạn thân”
        cũ Son Gwang-woo đâm sau lưng bằng chiêu trò đút lót để giành lấy dự án
        quốc gia, Chang-wook buộc phải bước vào một cuộc chơi hoàn toàn xa lạ:
        đút lót bằng golf - “môn thể thao quyền lực” của giới làm ăn. Một trận
        đấu thầu có một không hai, nơi những cú đánh trượt là chiến lược, còn
        đút lót là kỹ năng, tạo nên trận đấu vừa hài hước, vừa châm biếm về
        thương trường thời hiện đại.
      </p>
      <p>
        <span className="min-w-5 font-medium">Thời lượng: </span>{" "}
        <span className="font-light">1h 46m</span>
      </p>
      <p>
        <span className="min-w-5 font-medium">Quốc gia: </span>{" "}
        <span className="font-light text-white">Hàn Quốc</span>
      </p>
      <p>
        <span className="min-w-5 font-medium">Đạo diễn: </span>{" "}
        <span className="font-light text-white">
          Kim Tae-yong, Ha Jung-woo, Park Ho-chan, Choi Rin
        </span>
      </p>
    </div>
  );
};
export default MovieInformation;
