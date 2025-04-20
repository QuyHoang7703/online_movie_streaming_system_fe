import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import "@styles/styles.css";
import InputSearch from "@components/InputSearch";
import { useGetGenresQuery } from "@service/admin/genresApi";
import useNotification from "antd/es/notification/useNotification";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import GenreForm from "@pages/admin/GenreForm";
import GenericModal from "@context/GenericModal";
import ConfirmDeleteModal from "@pages/admin/ConfirmDeleteModal";

const GenreManagement = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Thể loại",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      // eslint-disable-next-line no-unused-vars
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditFilled />}
            size="large"
            type="primary"
            variant="solid"
            onClick={() => handleCreateOrUpdateGenre(true, record)}
          />
          <Button
            icon={<DeleteFilled />}
            size="large"
            color="danger"
            variant="solid"
            onClick={() => handleOpenModalDelete(record.id, record.name)}
          />
        </Space>
      ),
    },
  ];
  const { showNotification } = useNotification();
  const [search, setSearch] = useState("");

  const [searchDebounced, setSearchDebounced] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 2,
  });

  // Tạo debounce function
  const debouncedSearch = debounce((value) => {
    setSearchDebounced(value);
  }, 500);

  const handleSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  // reset page về 1 khi search từ khoá mới
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [searchDebounced]);

  const response = useGetGenresQuery({
    genreName: searchDebounced,
    page: pagination.page,
    size: pagination.pageSize,
  });
  useEffect(() => {
    if (response.isError) {
      showNotification("error", response?.error?.data?.message);
    }
  }, [response.isError, showNotification, response.error]);

  const genres = response?.data?.data?.result || [];
  // console.log({ genres });

  const [modalContent, setModalContent] = useState(null);

  const handleCreateOrUpdateGenre = (isUpdate = false, genre = null) => {
    setModalContent({
      title: isUpdate ? "Cập nhật thể loại" : "Tạo thể loại mới",
      open: true,
      onCancel: () => {
        setModalContent(null);
      },
      Component: GenreForm,
      componentProps: {
        isUpdate,
        genre,
        onSuccess: () => {
          setModalContent(null);
          response.refetch();
        },
        onCancel: () => {
          setModalContent(null);
        },
      },
    });
  };

  // Open modal confirm delete genre
  const [modelDeleteContent, setModelDeleteContent] = useState(null);
  const handleOpenModalDelete = (genreId, genreName) => {
    setModelDeleteContent({
      title: "Xác nhận xóa thể loại",
      open: true,
      onCancel: () => {
        setModelDeleteContent(null);
      },
      Component: ConfirmDeleteModal,
      componentProps: {
        genreId,
        genreName,
        onSuccess: () => {
          setModelDeleteContent(null);
          response.refetch();
        },
      },
    });
  };

  const isLoading = response.isLoading || response.isFetching;

  return (
    <div className="h-full bg-dark-200 p-7">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-white sm:text-2xl">
          Danh sách thể loại
        </p>
        <Button
          className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
          type="primary"
          onClick={() => handleCreateOrUpdateGenre()}
        >
          Tạo thể loại
        </Button>
      </div>
      <div className="mt-5">
        <InputSearch
          placeholder="Tìm kiếm thể loại"
          value={search}
          onChange={(e) => {
            console.log({ input: e.target.value });
            handleSearch(e.target.value);
          }}
          loading={isLoading}
        />
      </div>
      <div className="custom-pagination mt-5 rounded-lg bg-dark-100 p-7">
        <p className="mb-3 text-lg font-bold text-white">Thông tin thể loại</p>
        <Table
          columns={columns}
          dataSource={genres}
          rowKey="id"
          loading={isLoading}
          // rowClassName={() => "hover:bg-transparent"}
          className="custom-table"
          pagination={{
            current: pagination.page,
            pageSize: pagination.pageSize,
            total: response?.data?.data?.meta?.totalElements,
            onChange: (page, pageSize) => {
              setPagination({ ...pagination, page, pageSize });
            },
          }}
        ></Table>
      </div>
      {modalContent && <GenericModal {...modalContent} />}
      {modelDeleteContent && <GenericModal {...modelDeleteContent} />}
    </div>
  );
};
export default GenreManagement;
