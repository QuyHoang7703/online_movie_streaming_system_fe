import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormField from "@components/FormField";
import InputField from "@components/InputField";
import { Button } from "antd";
import { useUpdatePasswordMutation } from "@service/userApi";
import { useNotification } from "@hooks/useNotification";

const formSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Mật khẩu hiện tại không được để trống")
    .min(7, "Mật khẩu hiện tại phải có ít nhất 7 ký tự"),
  password: yup
    .string()
    .required("Mật khẩu mới không được để trống")
    .min(7, "Mật khẩu mới phải có ít nhất 7 ký tự"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

const UpdatePasswordForm = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const { showNotification } = useNotification();
  const onSubmit = async (formData) => {
    try {
      const response = await updatePassword(formData).unwrap();
      showNotification("success", response?.message);
      onSuccess?.();
    } catch (error) {
      showNotification("error", error?.data?.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="currentPassword"
          label="Mật khẩu hiện tại"
          Component={InputField}
          error={errors?.currentPassword?.message}
          type="password"
          // defaultValue={genre?.name}
        />
        <FormField
          control={control}
          name="password"
          label="Mật khẩu mới"
          Component={InputField}
          error={errors?.password?.message}
          type="password"
          // defaultValue={genre?.description}
        />
        <FormField
          control={control}
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          Component={InputField}
          error={errors?.confirmPassword?.message}
          type="password"
          // defaultValue={genre?.description}
        />
        <div className="flex justify-end gap-4">
          <Button
            htmlType="submit"
            size="large"
            type="success"
            color="cyan"
            variant="solid"
            loading={isLoading}
          >
            Cập nhập
          </Button>
          <Button
            // onClick={handleCancelModal}
            size="large"
            type="danger"
            color="red"
            variant="solid"
          >
            Thoát
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdatePasswordForm;
