import InputField from "@components/InputField";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "@components/ImageUpload";
import FormField from "@components/FormField";
import { Button, DatePicker, Radio, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Form, useSearchParams } from "react-router-dom";
import MovieActor from "@components/layout/admin/movie/MovieActor";
import { useGetGenresQuery } from "@service/admin/genresApi";
import { useCreateStandaloneMovieMutation } from "@service/admin/standaloneMovieApi";
import { useNotification } from "@hooks/useNotification";
import SelectField from "@components/SelectField";

const MovieFormInfo = ({ isUpdate = false }) => {
  const [searchParams] = useSearchParams();
  const movieType = searchParams.get("type");
  const [filePosterList, setFilePosterList] = useState([]);
  const [fileBackdropList, setFileBackdropList] = useState([]);
  const [isFree, setIsFree] = useState(true);
  const [trailer, setTrailer] = useState("");
  const [createStandaloneMovie, { isLoading: isCreateLoading }] =
    useCreateStandaloneMovieMutation();
  const { showNotification } = useNotification();

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
    // episodeNumber: yup
    //   .number()
    //   .typeError("Số tập phải là một số")
    //   .required("Số tập không được để trống"),
    // poster: yup
    //   .mixed()
    //   .test(
    //     "required",
    //     "Poster không được để trống",
    //     (value) => value && value.length > 0,
    //   ),
    // backdrop: yup
    //   .mixed()
    //   .test(
    //     "required",
    //     "Backdrop không được để trống",
    //     (value) => value && value.length > 0,
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
    const submitData = {
      ...data,
      movieType: movieType === "standalone" ? "STANDALONE" : "SERIES",
      isFree: isFree,
    };
    const formData = new FormData();
    formData.append(
      "movieInfo",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
    );
    if (filePosterList.length > 0) {
      formData.append("poster", filePosterList[0].originFileObj);
    }
    if (fileBackdropList.length > 0) {
      formData.append("backdrop", fileBackdropList[0].originFileObj);
    }
    try {
      const response = await createStandaloneMovie(formData).unwrap();
      showNotification("success", response?.message || "Thêm phim thành công!");
    } catch (error) {
      showNotification("error", error?.data?.message || "Thêm phim thất bại!");
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
          <div className="grid grid-cols-2 gap-12">
            <FormField
              control={control}
              name="title"
              label="Tên phim"
              Component={InputField}
              error={errors?.title?.message}
            />

            <FormField
              control={control}
              name="country"
              label="Quốc gia"
              Component={InputField}
              error={errors?.nationality?.message}
            />
          </div>
          <div className="grid grid-cols-2 gap-12">
            <FormField
              control={control}
              name="director"
              label="Đạo diễn"
              Component={InputField}
              error={errors?.director?.message}
            />
            <FormField
              control={control}
              name="releaseDate"
              label="Ngày phát hành"
              Component={(props) => (
                <DatePicker {...props} className="w-full" size="large" />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-12">
            <FormField
              control={control}
              name="genreIds"
              label="Thể loại"
              status={errors?.genre ? "error" : undefined}
              Component={({ value, onChange, error, ...props }) => (
                <SelectField
                  {...props}
                  value={value || []}
                  onChange={onChange}
                  size="large"
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn thể loại"
                  options={genreOptions}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  error={error}
                />
              )}
              error={errors?.genreIds?.message}
            />
            <FormField
              control={control}
              name="subscriptionPlanIds"
              label="Gói Subscription"
              Component={(props) => (
                <Select
                  {...props}
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Chọn gói"
                  options={[
                    { label: "Miễn phí", value: "free" },
                    { label: "Gói cơ bản", value: "basic" },
                    { label: "Gói nâng cao", value: "premium" },
                    { label: "Gói VIP", value: "vip" },
                  ]}
                />
              )}
              error={errors?.subscriptionPlan?.message}
            />
          </div>
          {movieType === "standalone" && (
            <div className="grid grid-cols-2 gap-12">
              <FormField
                control={control}
                name="duration"
                label="Độ dài"
                Component={InputField}
              />
              <FormField
                control={control}
                name="videoUrl"
                label="Video URL"
                Component={InputField}
              />
            </div>
          )}
          {movieType === "series" && (
            <div className="grid grid-cols-2 gap-12">
              <FormField
                control={control}
                name="season"
                label="Mùa"
                Component={InputField}
              />
              <FormField
                control={control}
                name="episodeNumber"
                label="Số tập"
                Component={InputField}
              />
            </div>
          )}
          {/* Trailer, poster, backdrop */}

          <div className="grid grid-cols-2 gap-12">
            {/* Cột hình ảnh */}
            <div className="flex h-full w-full flex-col">
              <p className="mb-1 p-2 pb-1 font-medium text-white">Hình ảnh</p>
              <div className="border-dark-300 flex h-[355px] h-full items-center justify-center gap-5 border-2 border-dashed p-4">
                <div>
                  <p className="font-base mb-1 text-white">Poster</p>
                  <ImageUpload
                    fileList={filePosterList || []}
                    className={"custom-upload-wrapper"}
                    onChange={handleChangePoster}
                  />
                </div>
                <div>
                  <p className="font-base mb-1 text-white">Backdrop</p>
                  <ImageUpload
                    fileList={fileBackdropList || []}
                    className={"custom-upload-wrapper"}
                    onChange={handleChangeBackdrop}
                  />
                </div>
              </div>
            </div>
            {/* Cột trailer */}
            <div className="flex h-full w-full flex-col">
              <FormField
                control={control}
                name="trailerUrl"
                label="Trailer"
                Component={InputField}
                value={trailer}
                onChange={(e) => {
                  setTrailer(e.target.value);
                }}
                error={errors?.trailer?.message}
              />
              <div className="mt-3 flex w-full justify-center">
                {trailer ? (
                  trailer.includes("youtube.com") ||
                  trailer.includes("youtu.be") ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={trailer.replace("watch?v=", "embed/")}
                      title="Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : trailer.match(/\.(mp4|webm|ogg)$/) ? (
                    <video width="100%" height="315" controls>
                      <source src={trailer} />
                      Trình duyệt của bạn không hỗ trợ video.
                    </video>
                  ) : (
                    <div className="bg-dark-300 flex h-[315px] w-full items-center justify-center rounded text-white">
                      Định dạng trailer không hợp lệ
                    </div>
                  )
                ) : (
                  <div className="bg-dark-300 flex h-[315px] w-full items-center justify-center rounded text-white">
                    Chưa có trailer
                  </div>
                )}
              </div>
            </div>
          </div>
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
          <div className="mt-4 flex justify-center gap-10">
            <Button
              color="cyan"
              variant="solid"
              htmlType="submit"
              size="large"
              loading={isCreateLoading}
            >
              Thêm
            </Button>
            <Button
              size="large"
              color="red"
              variant="solid"
              // onClick={handleCancelModal}
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
