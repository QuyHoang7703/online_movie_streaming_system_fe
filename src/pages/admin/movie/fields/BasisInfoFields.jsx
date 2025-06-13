import FormField from "@components/FormField";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { useGetAllGenresQuery } from "@service/admin/genresApi";
import { DatePicker, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import CustomSelectField from "@components/customeField/CustomSelectField";
import { getStatusOptionsByType } from "@consts/statusMovie";
import { QUALITY_OPTIONS } from "@consts/qualityOptions";
import { useGetCountriesQuery } from "@service/admin/countryApi";
import CustomInputNumberField from "@components/customeField/CustomInputNumberField";

const BasisInfoFields = ({ control, errors, movieType, watch, setValue }) => {
  // Load genre data
  const { data: genreData } = useGetAllGenresQuery({});
  const { data: countryData } = useGetCountriesQuery({});
  const [genreOptions, setGenreOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    if (genreData?.data) {
      const options = genreData.data.map((genre) => ({
        label: genre.name,
        value: genre.id,
      }));
      setGenreOptions(options);
    }
  }, [genreData]);
  const statusOptions = getStatusOptionsByType(movieType);

  useEffect(() => {
    if (countryData?.data) {
      const options = countryData.data.map((country) => ({
        label: country.name,
        value: country.id,
      }));
      setCountryOptions(options);
    }
  }, [countryData]);

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
          name="originalTitle"
          label="Tên gốc"
          Component={InputField}
          error={errors?.originalTitle?.message}
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
        {/* <FormField
          control={control}
          name="country"
          label="Quốc gia"
          Component={InputField}
          error={errors?.country?.message}
        /> */}
        <FormField
          control={control}
          name="countryIds"
          label="Quốc gia"
          status={errors?.country ? "error" : undefined}
          Component={({ value, onChange, error, ...props }) => (
            <SelectField
              {...props}
              value={value || []}
              onChange={onChange}
              size="large"
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn quốc gia"
              options={countryOptions}
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

        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={control}
            name="status"
            label="Trạng thái"
            Component={CustomSelectField}
            error={errors?.status?.message}
            size="large"
            options={statusOptions}
          />

          <FormField
            control={control}
            name="quality"
            label="Chất lượng hình ảnh"
            Component={CustomSelectField}
            error={errors?.quality?.message}
            size="large"
            options={QUALITY_OPTIONS}
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
      </div>
      {movieType === "STANDALONE" && (
        <div className="grid grid-cols-2 gap-12">
          <FormField
            control={control}
            name="budget"
            label="Ngân sách"
            Component={InputField}
            error={errors?.budget?.message}
          />
          <FormField
            control={control}
            name="revenue"
            label="Doanh thu"
            Component={InputField}
            error={errors?.revenue?.message}
          />
        </div>
      )}
      {movieType === "SERIES" && (
        <div className="grid grid-cols-2 gap-12">
          <FormField
            control={control}
            name="season"
            label="Mùa"
            Component={CustomInputNumberField}
            error={errors?.season?.message}
          />
          <FormField
            control={control}
            name="totalEpisodes"
            label="Số tập"
            Component={InputNumber}
            error={errors?.episodeNumber?.message}
          />
        </div>
      )}
    </div>
  );
};
export default BasisInfoFields;
