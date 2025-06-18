import { InfoCircleFilled } from "@ant-design/icons";
import MovieGenres from "@components/user/movie/MovieDetail/MovieGenres";
import MovieTags from "@components/user/movie/MovieDetail/MovieTags";
import { COUNTRY_NAME_MAP } from "@consts/countryNameMap";
import { movieTypeUrlMapperReverse } from "@consts/movieTypeUrlMapper";
import { convertMinutesToHourMinute } from "@utils/timeUtils";
import { Link } from "react-router-dom";

const MovieInformation = ({ movieDetail, layout = "vertical" }) => {
  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={`flex flex-col gap-5 text-white ${isHorizontal ? "mt-6" : ""}`}
    >
      <div
        className={`${
          isHorizontal ? "flex items-start gap-6" : "flex flex-col gap-3"
        } `}
      >
        <div className={isHorizontal ? "flex-shrink-0" : ""}>
          <img
            src={movieDetail.posterUrl}
            alt=""
            className={`rounded-xl ${isHorizontal ? "h-[150px] w-[100px]" : "h-[240px] w-[160px]"}`}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p
              className={`mb-2 font-bold text-white ${isHorizontal ? "text-xl" : "mt-2 text-2xl"}`}
            >
              {movieDetail.originalTitle}
            </p>
            <p className="mt-1 text-sm text-mainUserColor-100">
              {movieDetail.title}
            </p>
          </div>

          <MovieTags
            rating={movieDetail.voteAverage?.toFixed(1)}
            year={movieDetail.releaseDate?.split("-")[0]}
            duration={convertMinutesToHourMinute(movieDetail.duration)}
            type="16"
            quality={movieDetail.quality}
          />

          <MovieGenres genres={movieDetail.genres} />
        </div>
      </div>

      {!isHorizontal && (
        <>
          <div>
            <p className="mb-3 text-base font-medium">Giới thiệu: </p>
            <p className="text-gray-500">
              {movieDetail.description || "Đang cập nhật"}
            </p>
          </div>
          <p>
            <span className="min-w-5 font-medium">Thời lượng: </span>{" "}
            <span className="font-light text-gray-400">
              {convertMinutesToHourMinute(movieDetail.duration)}
            </span>
          </p>
          <p>
            <span className="min-w-5 font-medium">Quốc gia: </span>{" "}
            <span className="font-light text-white">
              {movieDetail.countries
                ?.map((country) => COUNTRY_NAME_MAP[country.name])
                .join(", ")}
            </span>
          </p>
          <p>
            <span className="min-w-5 font-medium">Đạo diễn: </span>{" "}
            <span className="font-light text-white">
              {movieDetail.director || "Đang cập nhật"}
            </span>
          </p>
        </>
      )}

      {isHorizontal && (
        <div className="mt-2">
          <p className="mb-2 text-base font-medium">Giới thiệu: </p>
          <p className="mb-4 text-gray-500">
            {movieDetail.description || "Đang cập nhật"}
          </p>
          <Link
            to={`/${movieTypeUrlMapperReverse[movieDetail.movieType]}/${movieDetail.id}`}
            className="text-mainUserColor-100"
          >
            <span>
              Thông tin chi tiết <InfoCircleFilled />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default MovieInformation;
