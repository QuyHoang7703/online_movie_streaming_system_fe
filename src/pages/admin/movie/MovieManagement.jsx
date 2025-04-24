import { DeleteFilled, EditFilled } from "@ant-design/icons";
import InputSearch from "@components/InputSearch";
import { Button, Image, Space, Table } from "antd";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import MovieTypeModal from "@pages/admin/movie/MovieTypeModal";
import GenericModal from "@context/GenericModal";

const MovieManagement = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "posterUrl",
      key: "posterUrl",
      render: (posterUrl) =>
        posterUrl ? (
          <Image
            src={posterUrl}
            alt="posterUrl"
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
      title: "Tên phim",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Đạo diễn",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Thể loại",
      dataIndex: "movieType",
      key: "movieType",
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
            // onClick={() =>
            //   // handleCreateOrUpdateActor(true, { actorId: record.id })
            // }
          />
          <Button
            icon={<DeleteFilled />}
            size="large"
            color="danger"
            variant="solid"
            // onClick={() => handleOpenModalDelete(record.id, record.name)}
          />
        </Space>
      ),
    },
  ];
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 4,
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

  const [isMovieTypeModalOpen, setIsMovieTypeModalOpen] = useState(false);
  const handleOpenMovieTypeModal = () => {
    console.log("open modal");
    setIsMovieTypeModalOpen(true);
  };

  return (
    <div className="h-full bg-dark-200 p-7">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-white sm:text-2xl">
          Danh sách phim
        </p>
        <Button
          className="border-none bg-createButton p-5 font-bold text-white hover:!bg-createButton/80 hover:text-white"
          type="primary"
          onClick={() => handleOpenMovieTypeModal()}
        >
          Thêm phim
        </Button>
      </div>
      <div className="mt-5">
        <InputSearch
          placeholder="Tìm kiếm phim"
          // value={search}
          // onChange={(e) => {
          //   handleSearch(e.target.value);
          // }}
          // loading={isLoading}
        />
      </div>
      <div className="custom-pagination mt-5 rounded-lg bg-dark-100 p-7">
        <p className="mb-3 text-lg font-bold text-white">Thông tin thể loại</p>
        <Table
          columns={columns}
          // dataSource={actors}
          rowKey="id"
          // loading={isLoading}
          // rowClassName={() => "hover:bg-transparent"}
          className="custom-table"
          // pagination={{
          //   current: pagination.pageNumber,
          //   pageSize: pagination.pageSize,
          //   total: response?.data?.data?.meta?.totalElements,
          //   onChange: (pageNumber, pageSize) => {
          //     setPagination({ ...pagination, pageNumber, pageSize });
          //   },
          // }}
        ></Table>
        {isMovieTypeModalOpen && (
          <GenericModal
            title="Loại phim"
            open={isMovieTypeModalOpen}
            onCancel={() => setIsMovieTypeModalOpen(false)}
            Component={MovieTypeModal}
            width={250}
          />
        )}
      </div>
    </div>
  );
};
export default MovieManagement;
