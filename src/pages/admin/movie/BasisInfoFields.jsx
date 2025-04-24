const BasisInfoFields = ({control, {errors}}) => {
  return (
    <div>
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
    </div>
  );
};
export default BasisInfoFields;
