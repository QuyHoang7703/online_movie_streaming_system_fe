import FormField from "@components/FormField";
import ImageUpload from "@components/ImageUpload";
import InputField from "@components/InputField";
import { useWatch } from "react-hook-form";

const MediaField = ({
  filePosterList,
  handleChangePoster,
  fileBackdropList,
  handleChangeBackdrop,
  // trailer,
  // setTrailer,
  control,
  errors,
}) => {
  const trailer = useWatch({ control, name: "trailerUrl" });
  return (
    <div>
      <div className="grid grid-cols-2 gap-12">
        {/* Cột hình ảnh */}
        {/* <div className="flex h-full w-full flex-col">
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
        </div> */}
        <div className="flex h-full w-full flex-col">
          <p className="mb-1 p-2 pb-1 font-medium text-white">Hình ảnh</p>
          <div className="border-dark-300 flex h-full flex-col items-center justify-center gap-5 border-2 border-dashed p-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <p className="font-base mb-1 text-white">Poster</p>
              <ImageUpload
                fileList={filePosterList || []}
                className={"custom-upload-wrapper"}
                onChange={handleChangePoster}
                name="poster"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="font-base mb-1 text-white">Backdrop</p>
              <ImageUpload
                fileList={fileBackdropList || []}
                className={"custom-upload-wrapper"}
                onChange={handleChangeBackdrop}
                name="backdrop"
              />
            </div>
          </div>
          {/* <FormField
            control={control}
            name="poster"
            label="Poster"
            Component={(props) => (
              <ImageUpload
                {...props}
                fileList={fileBackdropList || []}
                className={"custom-upload-wrapper"}
                onChange={handleChangePoster}
                name="poster"
              />
            )}
            error={errors?.poster?.message}
          />

          <FormField
            control={control}
            name="backdrop"
            label="Backdrop"
            Component={(props) => (
              <ImageUpload
                {...props}
                fileList={fileBackdropList || []}
                className={"custom-upload-wrapper"}
                onChange={handleChangeBackdrop}
                name="backdrop"
              />
            )}
            error={errors?.backdrop?.message}
          /> */}
        </div>

        {/* Cột trailer */}
        <div className="flex h-full w-full flex-col">
          <FormField
            control={control}
            name="trailerUrl"
            label="Trailer"
            Component={InputField}
            // value={trailer}
            // onChange={(e) => {
            //   setTrailer(e.target.value);
            // }}
            error={errors?.trailerUrl?.message}
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
    </div>
  );
};
export default MediaField;
