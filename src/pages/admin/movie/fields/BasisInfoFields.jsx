import FormField from "@components/FormField";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { useGetGenresQuery } from "@service/admin/genresApi";
import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";

const BasisInfoFields = ({ control, errors, movieType }) => {
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
  return (
    <div className="flex w-full flex-col gap-10 py-7">
      {" "}
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
          error={errors?.country?.message}
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
          label="Gói"
          // status={errors?.genre ? "error" : undefined}
          Component={({ value, onChange, error, ...props }) => (
            <SelectField
              {...props}
              value={value || []}
              onChange={onChange}
              size="large"
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn gói"
              options={[
                { label: "Miễn phí", value: 1 },
                { label: "Gói cơ bản", value: 2 },
                { label: "Gói nâng cao", value: 3 },
                { label: "Gói VIP", value: 4 },
              ]}
              showSearch
              optionFilterProp="label"
              error={error}
            />
          )}
          error={errors?.genreIds?.message}
        />
        {/* <FormField
          control={control}
          name="subscriptionPlanIds"
          label="Gói Subscription"
          Component={(props) => (
            <SelectField
              {...props}
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn gói"
              mode="multiple"
              showSearch
              options={[
                { label: "Miễn phí", value: 1 },
                { label: "Gói cơ bản", value: 2 },
                { label: "Gói nâng cao", value: 3 },
                { label: "Gói VIP", value: 4 },
              ]}
            />
          )}
          error={errors?.subscriptionPlan?.message}
        /> */}
      </div>
      {movieType === "STANDALONE" && (
        <div className="grid grid-cols-2 gap-12">
          <FormField
            control={control}
            name="duration"
            label="Độ dài"
            Component={InputField}
            error={errors?.duration?.message}
          />
          <FormField
            control={control}
            name="videoUrl"
            label="Video URL"
            Component={InputField}
            error={errors?.videoUrl?.message}
          />
        </div>
      )}
      {movieType === "SERIES" && (
        <div className="grid grid-cols-2 gap-12">
          <FormField
            control={control}
            name="season"
            label="Mùa"
            Component={InputField}
            error={errors?.season?.message}
          />
          <FormField
            control={control}
            name="episodeNumber"
            label="Số tập"
            Component={InputField}
            error={errors?.episodeNumber?.message}
          />
        </div>
      )}
    </div>
  );
};
export default BasisInfoFields;
