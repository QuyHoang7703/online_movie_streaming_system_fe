import { Button, Table, Tag, Typography, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import GenericModal from "@context/GenericModal";
import SubscriptionPlanForm from "./SubscriptionPlanForm";
import { useGetSubscriptionPlansQuery } from "@service/admin/subscriptionPlanApi";
import ConfirmDeleteModal from "@pages/admin/ConfirmDeleteModal";
import { useSubscriptionPlanCRUD } from "@hooks/useSubscriptionPlanCRUD";
import { useNotification } from "@hooks/useNotification";

const { Title, Text } = Typography;

const SubscriptionPlanManage = () => {
  const params = {
    page: 1,
    size: 10,
  };
  const { data: subscriptionPlans, isLoading } =
    useGetSubscriptionPlansQuery(params);

  const {
    handleDeleteSubscriptionPlan,
    isDeleteSuccess,
    isDeleteError,
    deleteResponse,
    deleteError,
    resetDelete,
  } = useSubscriptionPlanCRUD();

  const { showNotification } = useNotification();

  const handleShowSubscriptionPlanDetail = (subscriptionPlanId) => {
    handleShowSubscriptionPlanModal(true, subscriptionPlanId);
  };

  const columns = [
    {
      title: "Tên gói",
      dataIndex: "name",
      key: "name",
      render: (_index, record) => (
        <Space>
          <Text strong className="text-white">
            {record.name}
          </Text>
          {record.parentPlans && record.parentPlans.length > 0 && (
            <Tag color="blue">
              Con của: {record.parentPlans.map((p) => p.name).join(", ")}
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },

    {
      title: "Thời hạn & Giá",
      dataIndex: "planDurations",
      key: "planDurations",
      render: (planDurations) => (
        <Space direction="vertical">
          {planDurations.map((planDuration) => (
            <Tag key={planDuration.id} color="blue">
              {planDuration.name}: {planDuration.price.toLocaleString("vi-VN")}đ
            </Tag>
          ))}
        </Space>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Tag color={active ? "success" : "error"}>
          {active ? "Đang hoạt động" : "Tạm ngưng"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleShowSubscriptionPlanDetail(record.id)}
          >
            Sửa
          </Button>
          <Button
            color="red"
            variant="solid"
            icon={<DeleteOutlined />}
            onClick={() => handleOpenDeleteModal(record.id, record.name)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const [modalContent, setModalContent] = useState(null);
  const handleShowSubscriptionPlanModal = (
    isUpdate = false,
    subscriptionPlanId = null,
  ) => {
    setModalContent({
      title: isUpdate ? "Cập nhật gói dịch vụ" : "Thêm gói dịch vụ mới",

      open: true,
      onCancel: () => setModalContent(null),
      Component: SubscriptionPlanForm,
      width: 800,
      componentProps: {
        isUpdate,
        subscriptionPlanId,
        onSuccess: () => {
          setModalContent(null);
          // response.refetch();
        },
        onCancel: () => setModalContent(null),
      },
    });
  };

  const handleOpenDeleteModal = (subscriptionPlanId, subscriptionPlanName) => {
    setModalContent({
      title: "Xác nhận xóa gói dịch vụ",
      open: true,
      onCancel: () => setModalContent(null),
      Component: ConfirmDeleteModal,
      componentProps: {
        itemName: subscriptionPlanName,
        itemType: "gói dịch vụ",
        onConfirm: () => handleDeleteSubscriptionPlan(subscriptionPlanId),
      },
    });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setModalContent(null);
      resetDelete();
    }
    if (isDeleteError) {
      resetDelete();
    }
  }, [
    isDeleteSuccess,
    isDeleteError,
    deleteResponse,
    deleteError,
    showNotification,
    resetDelete,
  ]);

  return (
    <div className="h-full bg-dark-200 p-7">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xl font-bold text-white sm:text-2xl">
          Danh sách gói dịch vụ
        </p>
        <Button
          type="primary"
          icon={<PlusCircleFilled size={50} />}
          onClick={() => handleShowSubscriptionPlanModal()}
          className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
        >
          Thêm gói mới
        </Button>
      </div>
      <div className="custom-pagination mt-5 overflow-x-auto rounded-lg bg-dark-100 p-7">
        <p className="mb-3 text-lg font-bold text-white">
          Thông tin gói dịch vụ
        </p>
        <Table
          columns={columns}
          dataSource={subscriptionPlans?.data?.result}
          rowKey="id"
          className="custom-table"
          loading={isLoading}
          // bordered
        />
      </div>
      {modalContent && <GenericModal {...modalContent} />}
    </div>
  );
};

export default SubscriptionPlanManage;
