import { DeleteFilled, EditFilled } from "@ant-design/icons";
import InputSearch from "@components/InputSearch";
import { Button, Image, Space, Table, Tag } from "antd";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import MovieTypeModal from "@pages/admin/movie/MovieTypeModal";
import GenericModal from "@context/GenericModal";
import { useGetMoviesQuery } from "@service/admin/movieApi";
import MovieFilter from "@components/MovieFilter";
import { useNavigate } from "react-router-dom";

const genreColorMap = {
  "Hành động": "volcano",
  "Tình cảm": "magenta",
  "Kinh dị": "geekblue",
  "Lãng mạn": "purple",
  "Phiêu lưu": "cyan",
  // ...thêm các thể loại khác
};

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
            alt="avatarUrl"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
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
      title: "Loại phim",
      dataIndex: "movieType",
      key: "movieType",
    },
    {
      title: "Thể loại",
      dataIndex: "genres",
      key: "genres",
      render: (genres) =>
        Array.isArray(genres) && genres.length > 0 ? (
          <>
            {genres.map((genre) => (
              <Tag color={genreColorMap[genre.name] || "blue"} key={genre.id}>
                {genre.name}
              </Tag>
            ))}
          </>
        ) : (
          <span className="italic text-gray-400">Không có</span>
        ),
    },
    {
      title: "Ngày phát hành",
      dataIndex: "releaseDate",
      key: "releaseDate",
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
            onClick={() => {
              console.log({ record });
              handleShowMovieDetail(record.movieType, record.id);
            }}
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
  const [selectedCountries, setSelectedCountries] = useState(["Tất cả"]);
  const [isVisibleFilter, setIsVisibleFilter] = useState(false);
  const [selectedMovieType, setSelectedMovieType] = useState("Tất cả");
  const [selectedGenres, setSelectedGenres] = useState(["Tất cả"]);
  const [searchDebounced, setSearchDebounced] = useState("");

  const navigate = useNavigate();
  // Tạo debounce function
  const debouncedSearch = debounce((value) => {
    setSearchDebounced(value);
  }, 500);

  const handleSearch = (value) => {
    setSearch(value);
    debouncedSearch(value);
  };

  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const [modalContent, setModalContent] = useState(null);
  // const handleDeleteMovie = (movieId) => {
  //   setModalContent({
  //     title: "Xóa phim",
  //     open: true,
  //     onCancel: () => setModalContent(null),
  //     Component:
  //   })
  // }

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 4,
  });

  const params = {
    page: pagination.pageNumber,
    size: pagination.pageSize,
  };
  if (searchDebounced) {
    params.title = searchDebounced;
  }
  if (!selectedGenres.includes("Tất cả")) {
    params.genreNames = selectedGenres;
  }
  if (selectedMovieType !== "Tất cả") {
    params.movieType = selectedMovieType;
  }
  if (!selectedCountries.includes("Tất cả")) {
    params.countries = selectedCountries;
  }
  console.log({ params });

  const response = useGetMoviesQuery(params);
  console.log({ response });
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageNumber: 1 }));
  }, [searchDebounced]);

  const [isMovieTypeModalOpen, setIsMovieTypeModalOpen] = useState(false);
  const handleOpenMovieTypeModal = () => {
    console.log("open modal");
    setIsMovieTypeModalOpen(true);
  };

  useEffect(() => {
    if (response.isSuccess) {
      setMovieData(response?.data?.data?.result);
    }
  }, [response, setMovieData]);

  const handleShowMovieDetail = (movieType, movieId) => {
    console.log("movieType:", movieType);
    console.log("movieId:", movieId);
    navigate(`/admin/movies/update/${movieType}/${movieId}`);
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

      <div className="mb-3 mt-5">
        <InputSearch
          placeholder="Tìm kiếm phim"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          loading={response.isLoading || response.isFetching}
        />
      </div>
      <div>
        <MovieFilter
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedMovieType={selectedMovieType}
          setSelectedMovieType={setSelectedMovieType}
          isVisibleFilter={isVisibleFilter}
          setIsVisibleFilter={setIsVisibleFilter}
        />
      </div>

      <div className="custom-pagination mt-5 overflow-x-auto rounded-lg bg-dark-100 p-7">
        <p className="mb-3 text-lg font-bold text-white">Thông tin thể loại</p>
        <Table
          columns={columns}
          dataSource={movieData}
          rowKey="id"
          loading={response.isLoading || response.isFetching}
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
          pagination={{
            current: pagination.pageNumber,
            pageSize: pagination.pageSize,
            total: response?.data?.data?.meta?.totalElements,
            onChange: (pageNumber, pageSize) => {
              setPagination((prev) => ({
                ...prev,
                pageNumber,
                pageSize,
              }));
            },
          }}
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
