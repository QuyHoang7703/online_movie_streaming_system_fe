import {
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import InputSearch from "@components/InputSearch";
import { useNotification } from "@hooks/useNotification";
import {
  useDeleteActorMutation,
  useGetActorsQuery,
} from "@service/admin/actorApi";
import { Button, Image, Space, Table } from "antd";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import "@styles/styles.css";
import ActorForm from "@pages/admin/actor/ActorForm";
import GenericModal from "@context/GenericModal";
import ConfirmDeleteModal from "@pages/admin/ConfirmDeleteModal";

const ActorManagement = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (avatarUrl) =>
        avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="avatarUrl"
            width={60}
            height={60}
            style={{ objectFit: "cover", borderRadius: "50%" }}
            fallback="https://via.placeholder.com/60x60?text=No+Image" // Ảnh fallback nếu lỗi
          />
        ) : (
          <span className="italic text-gray-400">Không có ảnh</span>
        ),
    },
    {
      title: "Tên diễn viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDate",
      key: "birthDate",
    },
    {
      title: "Nơi sinh",
      dataIndex: "placeOfBirth",
      key: "placeOfBirth",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      // eslint-disable-next-line no-unused-vars
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditFilled />}
            size="large"
            type="primary"
            variant="solid"
            onClick={() =>
              handleCreateOrUpdateActor(true, { actorId: record.id })
            }
          >
            Cập nhật
          </Button>
          <Button
            icon={<DeleteFilled />}
            size="large"
            color="danger"
            variant="solid"
            onClick={() => handleOpenModalDelete(record.id, record.name)}
            loading={isDeleteLoading}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 8,
  });
  // Tạo debounce function
  const debouncedSearch = debounce((value) => {
    setSearchDebounced(value);
  }, 500);

  const handleSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
  }, [searchDebounced]);

  const response = useGetActorsQuery({
    actorName: searchDebounced,
    page: pagination.pageNumber,
    size: pagination.pageSize,
  });

  const { showNotification } = useNotification();
  useEffect(() => {
    if (response.isError) {
      showNotification("error", response?.error?.data?.message);
    }
  }, [response, showNotification]);

  const isLoading = response.isLoading || response.isFetching;
  const actors = response?.data?.data?.result || [];
  // const navigate = useNavigate();
  // const openActorForm = () => {
  //   navigate("/create-actor");
  // };

  const [modalContent, setModalContent] = useState(null);
  const [modelDeleteContent, setModelDeleteContent] = useState(null);

  const handleCreateOrUpdateActor = (isUpdate = false, actorId = null) => {
    setModalContent({
      title: isUpdate ? "Cập nhật diễn viên" : "Thêm diễn viên mới",
      open: true,
      onCancel: () => setModalContent(null),
      Component: ActorForm,
      width: 800,
      componentProps: {
        isUpdate,
        actorId,
        onSuccess: () => {
          setModalContent(null);
          response.refetch();
        },
        onCancel: () => setModalContent(null),
      },
    });
  };
  const [deleteActor, { isLoading: isDeleteLoading }] =
    useDeleteActorMutation();

  const handleDeleteActor = async (actorId) => {
    try {
      await deleteActor({ actorId }).unwrap();
      showNotification("success", "Diễn viên đã được xóa thành công");
    } catch (error) {
      showNotification("error", error?.data?.message);
    }
  };

  const handleOpenModalDelete = (actorId, actorName) => {
    setModelDeleteContent({
      title: "Xác nhận xóa diễn viên",
      open: true,
      onCancel: () => setModelDeleteContent(null),
      Component: ConfirmDeleteModal,
      componentProps: {
        itemName: actorName,
        itemType: "diễn viên",
        onConfirm: () => {
          handleDeleteActor(actorId);
          setModelDeleteContent(null);
        },
        onCancel: () => setModelDeleteContent(null),
      },
    });
  };

  return (
    <div className="h-full bg-dark-200 p-7">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-white sm:text-2xl">
          Danh sách diễn viên
        </p>
        <Button
          className="btn-create"
          type="primary"
          onClick={() => handleCreateOrUpdateActor()}
          icon={<PlusCircleFilled />}
        >
          Thêm diễn viên
        </Button>
      </div>
      <div className="mt-5">
        <InputSearch
          placeholder="Tìm kiếm diễn viên"
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          loading={isLoading}
        />
      </div>
      <div className="custom-pagination mt-5 rounded-lg bg-dark-100 p-7">
        <p className="mb-3 text-lg font-bold text-white">Thông tin thể loại</p>
        <Table
          columns={columns}
          dataSource={actors}
          rowKey="id"
          loading={isLoading}
          // rowClassName={() => "hover:bg-transparent"}
          className="custom-table"
          pagination={{
            current: pagination.pageNumber,
            pageSize: pagination.pageSize,
            total: response?.data?.data?.meta?.totalElements,
            onChange: (pageNumber, pageSize) => {
              setPagination({ ...pagination, pageNumber, pageSize });
            },
          }}
        ></Table>
      </div>
      {modalContent && <GenericModal {...modalContent} />}
      {modelDeleteContent && <GenericModal {...modelDeleteContent} />}
    </div>
  );
};
export default ActorManagement;
