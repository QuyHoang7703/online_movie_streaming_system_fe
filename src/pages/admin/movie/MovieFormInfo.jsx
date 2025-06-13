import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "@components/FormField";
import { Button, Tabs } from "antd";

import { useNavigate, useParams } from "react-router-dom";
import MovieActor from "@components/admin/movie/MovieActor";
import { useGetGenresQuery } from "@service/admin/genresApi";
import { useGetStandaloneMovieDetailQuery } from "@service/admin/standaloneMovieApi";
import BasisInfoFields from "./fields/BasisInfoFields";
import MediaField from "./fields/MediaField";
import { useGetSeriesMovieDetailQuery } from "@service/admin/seriesMovieApi";
import dayjs from "dayjs";
import { useMovieCRUD } from "@hooks/useMovieCRUD";
import "@styles/styles.css";
import CustomTextAreaField from "@components/customeField/CustomTextAreaField";
import MovieAccessType from "@components/customeField/MovieAccessType";

const MovieFormInfo = () => {
  // Kiểm tra form đang là form cập nhập hay form thêm movie
  const { movieType, movieId } = useParams();
  const isUpdate = Boolean(movieId && movieType);
  console.log({ movieId, movieType });

  const [filePosterList, setFilePosterList] = useState([]);
  const [fileBackdropList, setFileBackdropList] = useState([]);
  /*
   * fileVideoList is used in prepareFormData but setFileVideoList has been moved
   * to the VideoVersionInput component. We're keeping the state here for form submission
   * but the UI for video management is now in its own tab.
   */
  // eslint-disable-next-line no-unused-vars
  const [fileVideoList, setFileVideoList] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [fileList, setFileList] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");

  // // Add debug state
  // const [formDebug, setFormDebug] = useState({
  //   submitted: false,
  //   lastSubmitTime: null,
  //   submitCount: 0,
  //   lastValidationErrors: null,
  // });

  // // Debug mode flag
  // const showDebugPanel = true;

  const navigate = useNavigate();

  const createFormSchema = (movieType) => {
    const baseSchema = {
      title: yup.string().required("Tên phim không được để trống"),
      countryIds: yup.array().min(1, "Quốc gia không được để trống"),
      director: yup.string().required("Đạo diễn không được để trống"),
      description: yup.string().required("Mô tả không được để trống"),
      genreIds: yup.array().min(1, "Thể loại không được để trống"),
      movieActors: yup.array().of(
        yup.object().shape({
          actorId: yup.number().required("Chọn diễn viên"),
          characterName: yup.string().required("Nhập tên nhân vật"),
        }),
      ),

      trailerUrl: yup.string().required("Trailer không được để trống"),
      poster: yup.mixed().test("required", "Poster không được để trống", () => {
        return filePosterList && filePosterList.length > 0;
      }),
      backdrop: yup
        .mixed()
        .test("required", "Backdrop không được để trống", () => {
          return fileBackdropList && fileBackdropList.length > 0;
        }),

      subscriptionPlanIds: yup.array().when("free", {
        is: (free) => free === false,
        then: (schema) =>
          schema.min(1, "Bạn phải chọn ít nhất 1 gói cho phim này!"),
        otherwise: (schema) => schema,
      }),
    };

    if (movieType === "STANDALONE") {
      return yup.object().shape({
        ...baseSchema,
        // duration: yup
        //   .number()
        //   .typeError("Thời lượng phải là một số")
        //   .required("Thời lượng không được để trống")
        //   .positive("Thời lượng phải lớn hơn 0"),
      });
    } else {
      return yup.object().shape({
        ...baseSchema,
        season: yup
          .number()
          .typeError("Mùa phải là một số")
          .required("Mùa không được để trống")
          .positive("Mùa phải lớn hơn 0"),
        totalEpisodes: yup
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
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      genreIds: [],
      videoSource: "url",
      free: true,
      subscriptionPlanIds: [],
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
              budget: movieDetail.budget,
              revenue: movieDetail.revenue,
            }
          : {
              season: movieDetail.season,
              totalEpisodes: movieDetail.totalEpisodes,
            };

      // Check if movie is free
      const free = movieDetail.free === true;

      // Prepare default form values
      const defaultValues = {
        title: movieDetail.title,
        originalTitle: movieDetail.originalTitle,
        description: movieDetail.description,
        director: movieDetail.director,
        countryIds: movieDetail?.countries?.map((country) => country.id) || [],
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
        videoSource: "url",
        free: free,
        quality: movieDetail.quality,
        status: movieDetail.status,
        subscriptionPlanIds: free
          ? []
          : movieDetail.subscriptionPlans?.map(
              (subscriptionPlan) => subscriptionPlan.id,
            ) || [],
      };

      reset(defaultValues);
      console.log("Set form values:", defaultValues);

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
  }, [
    movieDetailResponse,
    setFileBackdropList,
    setFilePosterList,
    reset,
    setValue,
    movieType,
  ]);

  const handleChangePoster = ({ fileList: newList }) =>
    setFilePosterList(newList);
  const handleChangeBackdrop = ({ fileList: newList }) =>
    setFileBackdropList(newList);

  // Load genre data
  const genreData = useGetGenresQuery({});
  useEffect(() => {
    if (genreData?.data?.data?.result) {
      console.log("Genre data loaded");
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
    console.log("Form submitted");
    console.log("FULL FORM DATA:", JSON.stringify(data, null, 2));
    console.log("Form errors:", errors);

    // // Update debug state
    // setFormDebug((prev) => ({
    //   ...prev,
    //   submitted: true,
    //   lastSubmitTime: new Date().toISOString(),
    //   submitCount: prev.submitCount + 1,
    // }));

    // Log all errors in detail for debugging
    if (Object.keys(errors).length > 0) {
      console.error("VALIDATION ERRORS:", JSON.stringify(errors, null, 2));
      alert(
        "Form has validation errors: " +
          Object.keys(errors)
            .map((key) => `${key}: ${errors[key]?.message}`)
            .join(", "),
      );
      return;
    }

    console.log("Subscription Plans:", data.subscriptionPlanIds);
    console.log("Is Free:", data.free);

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
      fileVideoList,
      movieType,
      data.free,
      data.free ? [] : data.subscriptionPlanIds || [],
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

  // // Add an effect to log validation errors
  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     console.log("Current validation errors:", errors);
  //     setFormDebug((prev) => ({
  //       ...prev,
  //       lastValidationErrors: errors,
  //     }));
  //   }
  // }, [errors]);

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center bg-dark-200 p-8">
      <form
        className="mt-3 flex w-full gap-5 rounded-lg bg-dark-100 p-7"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex w-full flex-col gap-10 px-20 py-7">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white sm:text-2xl">
              {isUpdate ? "CHI TIẾT" : "THÊM"} PHIM{" "}
              {movieType === "STANDALONE" ? "LẺ" : "BỘ"}
            </p>

            {isUpdate && (
              <Button
                className="btn-create"
                onClick={() => {
                  navigate(`/admin/movies/${movieId}/video-versions`, {
                    state: {
                      movieType,
                    },
                  });
                }}
              >
                Phiên bản chiếu
              </Button>
            )}
          </div>

          {/* Tabs phần form */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="custom-tabs mt-1"
            items={[
              {
                key: "basic",
                label: "Thông tin cơ bản",
                children: (
                  <div className="p-4">
                    <BasisInfoFields
                      control={control}
                      errors={errors}
                      movieType={movieType}
                      fileList={fileList}
                      setFileList={setFileList}
                      watch={watch}
                      setValue={setValue}
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
                    <div className="mt-5">
                      <FormField
                        control={control}
                        name="description"
                        label="Mô tả"
                        Component={CustomTextAreaField}
                        error={errors.description?.message}
                        rows={6}
                      />
                    </div>
                    <MovieAccessType
                      control={control}
                      watch={watch}
                      errors={errors}
                      setValue={setValue}
                    />
                  </div>
                ),
              },

              {
                key: "actors",
                label: "Diễn viên",
                children: (
                  <div className="py-4">
                    <MovieActor
                      fields={fields}
                      append={append}
                      remove={remove}
                      control={control}
                      errors={errors?.movieActors}
                    />
                  </div>
                ),
              },
            ]}
          />

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
              htmlType="button"
              onClick={() => {
                navigate("/admin/movies");
              }}
            >
              Thoát
            </Button>
          </div>

          {/* Debug panel - always visible while debugging */}
          {/* {showDebugPanel && (
            <div className="mt-8 rounded border border-gray-500 bg-gray-800 p-4">
              <h3 className="mb-2 text-white">Debug Information</h3>
              <div className="text-sm text-gray-400">
                <p>Submit Count: {formDebug.submitCount}</p>
                <p>Last Submit: {formDebug.lastSubmitTime}</p>
                <p>
                  Has Errors: {Object.keys(errors).length > 0 ? "Yes" : "No"}
                </p>
                {Object.keys(errors).length > 0 && (
                  <div className="mt-2">
                    <p className="text-red-400">Validation Errors:</p>
                    <pre className="max-h-40 overflow-auto rounded bg-gray-900 p-2 text-xs">
                      {JSON.stringify(errors, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white"
                onClick={() =>
                  console.log("Form State:", {
                    errors,
                    values: watch(),
                    debug: formDebug,
                  })
                }
              >
                Log Form State
              </button>
            </div>
          )} */}
        </div>
      </form>
    </div>
  );
};
export default MovieFormInfo;
