import { Input, InputNumber, Select, Button } from "antd";
import { DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import {
  useGetParentSubscriptionPlanOptionsQuery,
  useGetSubscriptionPlanDetailQuery,
} from "@service/admin/subscriptionPlanApi";
import { useEffect } from "react";
import { useSubscriptionPlanCRUD } from "@hooks/useSubscriptionPlanCRUD";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormField from "@components/FormField";

const { TextArea } = Input;

// Custom component fields
const CustomInputField = ({ error, ...props }) => (
  <div className="flex w-full flex-col">
    <Input {...props} status={error ? "error" : undefined} />
    <div className="mt-1 h-5">
      {error && <div className="text-sm font-light text-red-500">{error}</div>}
    </div>
  </div>
);

const CustomTextAreaField = ({ error, ...props }) => (
  <div className="flex w-full flex-col">
    <TextArea {...props} status={error ? "error" : undefined} />
    <div className="mt-1 h-5">
      {error && <div className="text-sm font-light text-red-500">{error}</div>}
    </div>
  </div>
);

const CustomSelectField = ({ error, ...props }) => (
  <div className="flex w-full flex-col">
    <Select {...props} status={error ? "error" : undefined} />
    <div className="mt-1 h-5">
      {error && <div className="text-sm font-light text-red-500">{error}</div>}
    </div>
  </div>
);

const CustomInputNumberField = ({ error, ...props }) => (
  <div className="flex w-full flex-col">
    <InputNumber {...props} status={error ? "error" : undefined} />
    <div className="mt-1 h-5">
      {error && <div className="text-sm font-light text-red-500">{error}</div>}
    </div>
  </div>
);

const schema = yup.object().shape({
  name: yup.string().required("Tên gói không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  parentPlanIds: yup.array().of(yup.string()),
  planDurations: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Tên gói thời hạn không được để trống"),
        durationInMonths: yup
          .number()
          .required("Số tháng không được để trống")
          .min(1, "Số tháng phải lớn hơn 0"),
        price: yup
          .number()
          .required("Giá không được để trống")
          .min(0, "Giá không được âm"),
      }),
    )
    .min(1, "Phải có ít nhất một thời hạn"),
  features: yup
    .array()
    .of(yup.string())
    .min(1, "Phải có ít nhất một đặc trưng"),
  active: yup.boolean().required("Trạng thái không được để trống"),
});

const SubscriptionPlanForm = ({
  isUpdate = false,
  onCancel: handleCancelModal,
  isCreateLoading = false,
  isUpdateLoading = false,
  subscriptionPlanId,
}) => {
  const { data: subscriptionPlan, isSuccess } =
    useGetSubscriptionPlanDetailQuery(subscriptionPlanId, {
      skip: !subscriptionPlanId,
      refetchOnMountOrArgChange: true,
    });

  const { data: parentPlanOptions, isLoading: isLoadingParentOptions } =
    useGetParentSubscriptionPlanOptionsQuery(
      isUpdate && subscriptionPlanId ? subscriptionPlanId : undefined,
      { skip: false },
    );

  console.log({ subscriptionPlanId, isUpdate, parentPlanOptions });

  const { handleCreateSubscriptionPlan, handleUpdateSubscriptionPlan } =
    useSubscriptionPlanCRUD();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      parentPlanIds: [],
      planDurations: [{ name: "", durationInMonths: 1, price: 0 }],
      features: [],
      active: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "planDurations",
  });

  useEffect(() => {
    if (isSuccess) {
      const d = subscriptionPlan?.data;
      setValue("name", d.name);
      setValue("description", d.description);
      setValue("parentPlanIds", d.parentPlans?.map((p) => String(p.id)) || []);
      setValue(
        "planDurations",
        d.planDurations?.map((pd) => ({
          id: pd.id,
          price: pd.price,
          name: pd.name,
          durationInMonths: pd.durationInMonths,
        })) || [{ durationInMonths: 1, price: 0 }],
      );
      setValue("features", d.features || []);
      setValue("active", !!d.active);
    }
  }, [subscriptionPlan, isSuccess, setValue]);

  const onSubmit = async (data) => {
    console.log({ dataSubmit: data });
    if (!isUpdate) {
      await handleCreateSubscriptionPlan(data);
      handleCancelModal?.();
    } else {
      const oldParentPlanIds =
        subscriptionPlan?.data?.parentPlans?.map((p) => String(p.id)) || [];
      const newParentPlanIds = data.parentPlanIds || [];
      const relatedPlanIds = Array.from(
        new Set([...oldParentPlanIds, ...newParentPlanIds]),
      );
      await handleUpdateSubscriptionPlan(subscriptionPlanId, {
        ...data,
        relatedPlanIds,
      });
      handleCancelModal?.();
    }
  };

  return (
    <div className="h-full bg-dark-200 p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-21 flex flex-col gap-5 rounded-lg"
      >
        <div className="flex w-full flex-col gap-4">
          <FormField
            control={control}
            name="name"
            label="Tên gói"
            Component={CustomInputField}
            error={errors.name?.message}
          />

          <FormField
            control={control}
            name="description"
            label="Mô tả"
            Component={CustomTextAreaField}
            error={errors.description?.message}
          />

          <FormField
            control={control}
            name="parentPlanIds"
            label="Gói cha"
            Component={({ value, onChange, error, ...props }) => (
              <CustomSelectField
                {...props}
                value={value || []}
                onChange={onChange}
                mode="multiple"
                size="large"
                allowClear
                style={{ width: "100%" }}
                placeholder={
                  isLoadingParentOptions
                    ? "Đang tải..."
                    : "Chọn gói cha (nếu có)"
                }
                loading={isLoadingParentOptions}
                options={
                  Array.isArray(parentPlanOptions?.data)
                    ? parentPlanOptions.data.map((plan) => ({
                        label: plan.name,
                        value: String(plan.id),
                      }))
                    : []
                }
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
            error={errors.parentPlanIds?.message}
          />

          {/* Hiển thị các gói con nếu có */}
          {subscriptionPlan?.data?.childPlans?.length > 0 && (
            <div className="mt-2">
              <label className="text-base font-medium text-white">
                Các gói con
              </label>
              <ul className="list-disc pl-5 text-white">
                {subscriptionPlan.data.childPlans.map((plan) => (
                  <li key={plan.id}>{plan.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium">Thời hạn & Giá</label>
              <Button
                type="primary"
                onClick={() =>
                  append({ name: "", durationInMonths: 1, price: 0 })
                }
                icon={<PlusCircleFilled />}
                className="border-none bg-createButton p-3 font-bold text-white hover:!bg-createButton/80 hover:text-white"
              >
                Thêm thời hạn
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <div className="w-[35%]">
                  <FormField
                    control={control}
                    name={`planDurations.${index}.name`}
                    label="Tên gói thời hạn"
                    Component={CustomInputField}
                    error={errors.planDurations?.[index]?.name?.message}
                  />
                </div>

                <div className="w-[15%]">
                  <FormField
                    control={control}
                    name={`planDurations.${index}.durationInMonths`}
                    label="Số tháng"
                    Component={({ value, onChange, error, ...props }) => (
                      <CustomInputNumberField
                        {...props}
                        value={value}
                        onChange={onChange}
                        min={1}
                        placeholder="Số tháng"
                        error={error}
                      />
                    )}
                    error={
                      errors.planDurations?.[index]?.durationInMonths?.message
                    }
                  />
                </div>

                <div className="w-[20%]">
                  <FormField
                    control={control}
                    name={`planDurations.${index}.price`}
                    label="Giá"
                    Component={({ value, onChange, error, ...props }) => (
                      <CustomInputNumberField
                        {...props}
                        value={value}
                        onChange={onChange}
                        min={0}
                        placeholder="Giá"
                        className="w-full"
                        formatter={(value) =>
                          value
                            ? value
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            : ""
                        }
                        parser={(value) =>
                          value ? value.replace(/\./g, "") : ""
                        }
                        error={error}
                      />
                    )}
                    error={errors.planDurations?.[index]?.price?.message}
                  />
                </div>

                <Button
                  type="text"
                  color="red"
                  variant="solid"
                  icon={<DeleteOutlined />}
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                />
              </div>
            ))}
            {errors.planDurations && !Array.isArray(errors.planDurations) && (
              <span className="text-red-500">
                {errors.planDurations.message}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <FormField
                control={control}
                name="features"
                label={
                  <span className="mb-2 block text-lg font-semibold">
                    Đặc trưng
                  </span>
                }
                Component={({ value, onChange, error, ...props }) => (
                  <div>
                    <CustomSelectField
                      {...props}
                      value={value || []}
                      onChange={onChange}
                      mode="tags"
                      style={{ width: "100%" }}
                      placeholder="Nhập đặc trưng và nhấn Enter"
                      tokenSeparators={["\n"]}
                      error={error}
                    />
                    <div className="mt-1 text-xs text-gray-400">
                      Nhập đặc trưng và nhấn Enter. Có thể nhập nhiều đặc trưng
                      một lúc, mỗi đặc trưng là một tag.
                    </div>
                  </div>
                )}
                error={errors.features?.message}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="active"
            label="Trạng thái"
            Component={({ value, onChange, error, ...props }) => (
              <CustomSelectField
                {...props}
                value={value}
                onChange={onChange}
                className="w-full"
                options={[
                  { label: "Đang hoạt động", value: true },
                  { label: "Tạm ngưng", value: false },
                ]}
                error={error}
              />
            )}
            error={errors.active?.message}
          />

          <div className="mt-4 flex justify-center gap-10">
            <Button
              color="cyan"
              variant="solid"
              htmlType="submit"
              size="large"
              loading={isUpdate ? isUpdateLoading : isCreateLoading}
            >
              {isUpdate ? "Cập nhật" : "Thêm"}
            </Button>
            <Button
              size="large"
              color="red"
              variant="solid"
              onClick={handleCancelModal}
            >
              Thoát
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionPlanForm;
