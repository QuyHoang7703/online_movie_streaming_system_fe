import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "@components/FormField";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import MovieActor from "@components/layout/admin/movie/MovieActor";
import { useGetGenresQuery } from "@service/admin/genresApi";
import { useGetStandaloneMovieDetailQuery } from "@service/admin/standaloneMovieApi";
import BasisInfoFields from "./fields/BasisInfoFields";
import MediaField from "./fields/MediaField";
import { useGetSeriesMovieDetailQuery } from "@service/admin/seriesMovieApi";
import dayjs from "dayjs";
import { useMovieCRUD } from "@hooks/useMovieCRUD";
import { Form } from "antd";

const MovieFormInfo = () => {
  // Kiểm tra form đang là form cập nhập hay form thêm movie
  const { movieType, movieId } = useParams();
  const isUpdate = Boolean(movieId && movieType);
  console.log({ movieId, movieType });

  const [filePosterList, setFilePosterList] = useState([]);
  const [fileBackdropList, setFileBackdropList] = useState([]);
  const [isFree, setIsFree] = useState(true);
  const [trailer, setTrailer] = useState("");

  const navigate = useNavigate();

  const createFormSchema = (movieType) => {
    const baseSchema = {
      title: yup.string().required("Tên phim không được để trống"),
      country: yup.string().required("Quốc gia không được để trống"),
      director: yup.string().required("Đạo diễn không được để trống"),
      description: yup.string().required("Mô tả không được để trống"),
      genreIds: yup.array().min(1, "Thể loại không được để trống"),
      movieActors: yup.array().of(
        yup.object().shape({
          actorId: yup.number().required("Chọn diễn viên"),
          characterName: yup.string().required("Nhập tên nhân vật"),
        }),
      ),
      subscriptionPlan: yup.string().default("FREE"),
      trailerUrl: yup.string().required("Trailer không được để trống"),
      poster: yup
        .mixed()
        .test("required", "Poster không được để trống", (value) => {
          return filePosterList && filePosterList.length > 0;
        }),
      backdrop: yup
        .mixed()
        .test("required", "Backdrop không được để trống", (value) => {
          return fileBackdropList && fileBackdropList.length > 0;
        }),
    };

    if (movieType === "STANDALONE") {
      return yup.object().shape({
        ...baseSchema,
        duration: yup
          .number()
          .typeError("Thời lượng phải là một số")
          .required("Thời lượng không được để trống")
          .positive("Thời lượng phải lớn hơn 0"),
        videoUrl: yup.string().required("Nguồn phim không được để trống"),
      });
    } else {
      return yup.object().shape({
        ...baseSchema,
        season: yup
          .number()
          .typeError("Mùa phải là một số")
          .required("Mùa không được để trống")
          .positive("Mùa phải lớn hơn 0"),
        episodeNumber: yup
          .number()
          .typeError("Số tập phải là một số")
          .required("Số tập không được để trống")
          .positive("Số tập phải lớn hơn 0"),
      });
    }
  };

  const formSchema = createFormSchema(movieType);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      genreIds: [],
      subscriptionPlan: "FREE",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "movieActors",
  });

  // Hiển thị chi tiết movie theo movieType
  const { data: standaloneMovieData } = useGetStandaloneMovieDetailQuery(
    movieId,
    {
      skip: !(movieType === "STANDALONE" && movieId),
    },
  );

  const { data: seriesMovieData } = useGetSeriesMovieDetailQuery(movieId, {
    skip: !(movieType === "SERIES" && movieId),
  });

  const movieDetailResponse =
    movieType === "STANDALONE" ? standaloneMovieData : seriesMovieData;

  // Hiển thị chi tiết movie theo movieType nếu là chức năng cập nhập
  useEffect(() => {
    if (movieDetailResponse?.data) {
      const movieDetail = movieDetailResponse.data;
      const extraFields =
        movieType === "STANDALONE"
          ? {
              duration: movieDetail.duration,
              videoUrl: movieDetail.videoUrl,
            }
          : {
              season: movieDetail.season,
              episodeNumber: movieDetail.episodeNumber,
            };
      reset({
        title: movieDetail.title,
        description: movieDetail.description,
        director: movieDetail.director,
        country: movieDetail.country,
        releaseDate: movieDetail.releaseDate
          ? dayjs(movieDetail.releaseDate)
          : null,
        trailerUrl: movieDetail.trailerUrl,
        movieType: movieDetail.movieType,
        genreIds: movieDetail?.genres
          ? movieDetail.genres.map((genre) => genre.id)
          : [],

        movieActors: movieDetail.movieActors || [],
        ...extraFields,
      });
      if (movieDetail.posterUrl) {
        setFilePosterList([
          {
            url: movieDetail.posterUrl,
          },
        ]);
      }
      if (movieDetail.backdropUrl) {
        setFileBackdropList([
          {
            url: movieDetail.backdropUrl,
          },
        ]);
      }
    }
  }, [movieDetailResponse, setFileBackdropList, setFilePosterList, reset]);

  const handleChangePoster = ({ fileList: newList }) =>
    setFilePosterList(newList);
  const handleChangeBackdrop = ({ fileList: newList }) =>
    setFileBackdropList(newList);

  // Load genre data
  const genreData = useGetGenresQuery({});
  const [genreOptions, setGenreOptions] = useState([]);
  useEffect(() => {
    if (genreData?.data?.data?.result) {
      const options = genreData.data.data.result.map((genre) => ({
        label: genre.name,
        value: genre.id,
      }));
      setGenreOptions(options);
    }
  }, [genreData]);

  // Sử dụng custom hook
  const {
    handleCreateMovie,
    handleUpdateMovie,
    prepareFormData,
    isCreateStandaloneLoading,
    isCreateSeriesLoading,
    isUpdateStandaloneLoading,
    isUpdateSeriesLoading,
  } = useMovieCRUD();

  const isCreateLoading =
    movieType === "STANDALONE"
      ? isCreateStandaloneLoading
      : isCreateSeriesLoading;

  const isUpdateLoading =
    movieType === "STANDALONE"
      ? isUpdateStandaloneLoading
      : isUpdateSeriesLoading;

  const handleOnSubmit = async (data) => {
    // Kiểm tra poster và backdrop khi submit
    if (filePosterList.length === 0) {
      setError("poster", {
        type: "required",
        message: "Poster không được để trống",
      });
      return;
    }

    if (fileBackdropList.length === 0) {
      setError("backdrop", {
        type: "required",
        message: "Backdrop không được để trống",
      });
      return;
    }

    const formData = prepareFormData(
      data,
      filePosterList,
      fileBackdropList,
      movieType,
      isFree,
    );

    try {
      if (!isUpdate) {
        await handleCreateMovie(formData, movieType);
      } else {
        await handleUpdateMovie(formData, movieId, movieType);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center bg-dark-200 p-10">
      <form
        className="mt-3 flex w-full gap-5 rounded-lg bg-dark-100 p-7"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex w-full flex-col gap-10 px-20 py-7">
          <p className="border-b border-white pb-5 text-xl font-bold text-white sm:text-2xl">
            {isUpdate ? "CHI TIẾT" : "THÊM"} PHIM{" "}
            {movieType === "STANDALONE" ? "LẺ" : "BỘ"}
          </p>
          <BasisInfoFields
            control={control}
            errors={errors}
            movieType={movieType}
          />

          <MediaField
            control={control}
            errors={errors}
            filePosterList={filePosterList}
            setFilePosterList={setFilePosterList}
            handleChangePoster={handleChangePoster}
            fileBackdropList={fileBackdropList}
            setFileBackdropList={setFileBackdropList}
            handleChangeBackdrop={handleChangeBackdrop}
            trailer={trailer}
            setTrailer={setTrailer}
          />
          <div>
            <Form.Item
              label="Mô tả"
              validateStatus={errors?.description ? "error" : ""}
              help={errors?.description?.message}
              labelCol={{ span: 24 }}
              className="[&_.ant-form-item-explain-error]:font-base [&_.ant-form-item-explain-error]:mt-2 [&_.ant-form-item-explain-error]:text-red-400 [&_.ant-form-item-label>label]:font-bold [&_.ant-form-item-label>label]:text-white"
            >
              <FormField
                control={control}
                name="description"
                Component={(props) => <TextArea {...props} rows={6} />}
                className="col-span-2"
              />
            </Form.Item>
            <div>
              <MovieActor
                fields={fields}
                append={append}
                remove={remove}
                control={control}
                errors={errors?.movieActors}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-10">
            <Button
              color="cyan"
              variant="solid"
              htmlType="submit"
              size="large"
              loading={!isUpdate ? isCreateLoading : isUpdateLoading}
            >
              {!isUpdate ? "Thêm" : "Cập nhập"}
            </Button>
            <Button
              size="large"
              color="red"
              variant="solid"
              onClick={() => {
                navigate("/admin/movies");
              }}
            >
              Thoát
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default MovieFormInfo;
