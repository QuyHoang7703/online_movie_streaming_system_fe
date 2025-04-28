import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "@components/FormField";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MovieActor from "@components/layout/admin/movie/MovieActor";
import { useGetGenresQuery } from "@service/admin/genresApi";
import {
  useCreateStandaloneMovieMutation,
  useGetStandaloneMovieDetailQuery,
  useUpdateStandaloneMovieMutation,
} from "@service/admin/standaloneMovieApi";
import { useNotification } from "@hooks/useNotification";
import BasisInfoFields from "./fields/BasisInfoFields";
import MediaField from "./fields/MediaField";
import {
  useCreateSeriesMovieMutation,
  useGetSeriesMovieDetailQuery,
  useUpdateSeriesMovieMutation,
} from "@service/admin/seriesMovieApi";
import dayjs from "dayjs";
const MovieFormInfo = () => {
  // Kiểm tra form đang là form cập nhập hay form thêm movie
  const { movieType, movieId } = useParams();
  const isUpdate = Boolean(movieId && movieType);
  console.log({ isUpdate });

  const [filePosterList, setFilePosterList] = useState([]);
  const [fileBackdropList, setFileBackdropList] = useState([]);
  const [isFree, setIsFree] = useState(true);
  const [trailer, setTrailer] = useState("");

  const [createStandaloneMovie, { isLoading: isCreateStandaloneLoading }] =
    useCreateStandaloneMovieMutation();

  const [createSeriesMovie, { isLoading: isCreateSeriesLoading }] =
    useCreateSeriesMovieMutation();

  const isCreateLoading =
    movieType === "STANDALONE"
      ? isCreateStandaloneLoading
      : isCreateSeriesLoading;

  const [updateStandaloneMovie, { isLoading: isUpdateStandaloneLoading }] =
    useUpdateStandaloneMovieMutation();

  const [updateSeriesMovie, { isLoading: isUpdateSeriesLoading }] =
    useUpdateSeriesMovieMutation();

  const isUpdateLoading =
    movieType === "STANDALONE"
      ? isUpdateStandaloneLoading
      : isUpdateSeriesLoading;

  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
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
    // subscriptionPlan: yup
    //   .string()
    //   .required("Gói Subscription không được để trống"),
    // season: yup.number().required("Mùa không được để trống"),
    // duration: yup
    //   .number()
    //   .typeError("Thời lượng phải là một số")
    //   .required("Thời lượng không được để trống"),
    // videoUrl: yup.string().required("Nguồn phim không được để trống"),

    // episodeNumber: yup
    //   .number()
    //   .typeError("Số tập phải là một số")
    //   .required("Số tập không được để trống"),
    // season: yup
    //   .number()
    //   .typeError("Mùa phải là một số")
    //   .required("Mùa không được để trống"),
    // poster: yup
    //   .mixed()
    //   .test(
    //     "required",
    //     "Poster không được để trống",
    //     (value) => Array.isArray(value) && value.length > 0,
    //   ),
    // backdrop: yup
    //   .mixed()
    //   .test(
    //     "required",
    //     "Backdrop không được để trống",
    //     (value) => Array.isArray(value) && value.length > 0,
    //   ),

    trailerUrl: yup.string().required("Trailer không được để trống"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      // ...other fields
      genreIds: [], // Thêm dòng này
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

  const handleOnSubmit = async (data) => {
    console.log({ data });
    const submitData = {
      ...data,
      genreIds: (data.genreIds || []).map(Number),

      movieType: movieType === "standalone" ? "STANDALONE" : "SERIES",
      isFree: isFree,
    };
    const formData = new FormData();
    formData.append(
      "movieInfo",
      new Blob([JSON.stringify(submitData)], { type: "application/json" }),
    );
    if (filePosterList.length > 0) {
      formData.append("poster", filePosterList[0].originFileObj);
    }
    if (fileBackdropList.length > 0) {
      formData.append("backdrop", fileBackdropList[0].originFileObj);
    }
    if (!isUpdate) {
      try {
        let response;
        if (movieType === "STANDALONE") {
          response = await createStandaloneMovie(formData).unwrap();
        } else {
          response = await createSeriesMovie(formData).unwrap();
        }
        showNotification(
          "success",
          response?.message || "Thêm phim thành công!",
        );
        navigate("/admin/movies");
      } catch (error) {
        showNotification(
          "error",
          error?.data?.message || "Thêm phim thất bại!",
        );
      }
    } else {
      try {
        let response;
        if (movieType === "STANDALONE") {
          response = await updateStandaloneMovie({
            movieId,
            formData,
          }).unwrap();
        } else {
          response = await updateSeriesMovie({
            movieId,
            formData,
          }).unwrap();
        }

        showNotification(
          "success",
          response?.message || "Cập nhập phim thành công!",
        );
        navigate("/admin/movies");
      } catch (error) {
        showNotification(
          "error",
          error?.data?.message || "Cập nhập phim thất bại!",
        );
      }
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
            THÊM PHIM {movieType === "standalone" ? "LẺ" : "BỘ"}
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
            <FormField
              control={control}
              name="description"
              label="Mô tả"
              Component={(props) => <TextArea {...props} rows={6} />}
              className="col-span-2"
            />
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
