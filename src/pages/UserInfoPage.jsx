import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Radio, Avatar, Typography, Space } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormField from "@components/FormField";
import InputField from "@components/InputField";
import ImageUpload from "@components/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserInfoMutation } from "@service/userApi";
import { useNotification } from "@hooks/useNotification";
import { saveUserInfo } from "@redux/slides/authSlice";
import UpdatePasswordForm from "@components/UpdatePasswordForm";
import GenericModal from "@context/GenericModal";

const { Title, Text } = Typography;

const UserInfoPage = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log({ userInfo });
  const [selectedGender, setSelectedGender] = useState("MALE");
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newList }) => setFileList(newList);

  const formSchema = yup.object().shape({
    name: yup.string().required("Tên hiển thị không được để trống"),
  });
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        email: userInfo.email,
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        gender: userInfo.gender,
      });
      if (userInfo.avatarUrl) {
        setFileList([
          {
            url: userInfo.avatarUrl,
          },
        ]);
      }
    }
  }, [userInfo, reset]);

  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
  const { showNotification } = useNotification();
  const [modelContent, setModelContent] = useState(null);

  const showUpdatePasswordModel = () => {
    setModelContent({
      title: "Cập nhật mật khẩu",
      open: true,
      onCancel: () => {
        setModelContent(null);
      },
      Component: UpdatePasswordForm,
      componentProps: {
        onSuccess: () => {
          setModelContent(null);
        },
        onCancel: () => {
          setModelContent(null);
        },
      },
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    // 1. Thêm userInfo dưới dạng JSON
    formData.append(
      "userInfo",
      new Blob([JSON.stringify(data)], { type: "application/json" }),
    );
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("avatar", fileList[0].originFileObj);
    }

    try {
      const response = await updateUserInfo(formData).unwrap();
      console.log({ response });
      showNotification("success", response?.message);
      dispatch(saveUserInfo(response?.data));
      if (response?.data?.avatarUrl) {
        setFileList([
          {
            url: `${response.data.avatarUrl}?t=${new Date().getTime()}`, // ép load mới ảnh
          },
        ]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-5">
      <div className="mx-auto max-w-4xl rounded-xl bg-gray-800 p-10">
        {/* Header */}
        <div className="mb-10">
          <Title
            level={2}
            className="!mb-2 !text-3xl !font-semibold !text-white"
          >
            Tài khoản
          </Title>
          <Text className="!text-base !text-gray-400">
            Cập nhật thông tin tài khoản:{" "}
            <span className="text-gray-500">{userInfo.email}</span>
          </Text>
        </div>

        {/* Content */}
        <div className="gap-15 flex items-start">
          {/* Form Section */}
          <div className="max-w-md flex-1">
            <Space direction="vertical" size="large" className="mb-10 w-full">
              {/* Email Field */}

              {/* Name Field */}
              <div className="w-full">
                <FormField
                  control={control}
                  name="name"
                  label="Tên hiển thị"
                  error={errors?.name?.message}
                  Component={InputField}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={control}
                  name="phoneNumber"
                  label="Số điện thoại"
                  Component={(props) => (
                    <InputField
                      {...props}
                      className="w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={control}
                  name="address"
                  label="Địa chỉ"
                  Component={(props) => (
                    <InputField
                      {...props}
                      className="w-full rounded-lg border-gray-600 bg-gray-700 p-3 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  )}
                />
              </div>

              {/* Gender Field */}
              <div className="w-full">
                <Text className="!mb-3 !block !text-sm !font-medium !text-white">
                  Giới tính
                </Text>

                <FormField
                  control={control}
                  name="gender"
                  error={errors?.gender?.message}
                  Component={Radio.Group}
                  className="flex gap-6"
                >
                  <Radio
                    value="MALE"
                    className="!text-sm !text-white [&:hover_.ant-radio-inner]:border-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:border-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:bg-blue-500 [&_.ant-radio-inner]:border-gray-500 [&_.ant-radio-inner]:bg-transparent"
                  >
                    Nam
                  </Radio>
                  <Radio
                    value="FEMALE"
                    className="!text-sm !text-white [&:hover_.ant-radio-inner]:border-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:border-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:bg-blue-500 [&_.ant-radio-inner]:border-gray-500 [&_.ant-radio-inner]:bg-transparent"
                  >
                    Nữ
                  </Radio>
                  <Radio
                    value="OTHER"
                    className="!text-sm !text-white [&:hover_.ant-radio-inner]:border-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:border-blue-500 [&_.ant-radio-checked_.ant-radio-inner]:bg-blue-500 [&_.ant-radio-inner]:border-gray-500 [&_.ant-radio-inner]:bg-transparent"
                  >
                    Không xác định
                  </Radio>
                </FormField>
              </div>
            </Space>

            {/* Update Button */}
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit(onSubmit)}
              className="btn-create h-12"
              loading={isLoading}
            >
              Cập nhật
            </Button>

            {/* Password Link */}
            <div className="text-center">
              <Text className="!text-sm !text-gray-400">
                Đổi mật khẩu, nhấn vào{" "}
                <span
                  className="cursor-pointer text-yellow-500 underline hover:text-yellow-600"
                  onClick={showUpdatePasswordModel}
                >
                  đây
                </span>
              </Text>
            </div>
          </div>

          <div className="flex min-h-[300px] flex-1 flex-col items-center justify-center">
            <p className="mb-3 text-sm font-medium text-gray-300">
              Ảnh đại diện
            </p>
            <ImageUpload fileList={fileList} onChange={handleChange} />
          </div>
        </div>
      </div>
      {modelContent && <GenericModal {...modelContent} />}
    </div>
  );
};

export default UserInfoPage;
