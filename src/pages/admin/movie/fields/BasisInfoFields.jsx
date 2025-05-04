import FormField from "@components/FormField";
import InputField from "@components/InputField";
import SelectField from "@components/SelectField";
import { useGetGenresQuery } from "@service/admin/genresApi";

import { DatePicker, Tooltip, Tag, Radio } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import CustomSelectField from "@components/customeField/CustomSelectField";
import { getStatusOptionsByType } from "@consts/statusMovie";

const BasisInfoFields = ({ control, errors, movieType, watch, setValue }) => {
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
  const statusOptions = getStatusOptionsByType(movieType);

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

        <div className="flex flex-col">
          <FormField
            control={control}
            name="status"
            label="Trạng thái"
            Component={CustomSelectField}
            error={errors?.status?.message}
            size="large"
            options={statusOptions}
          />
        </div>
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
            name="budget"
            label="Ngân sách"
            Component={InputField}
            error={errors?.budget?.message}
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
