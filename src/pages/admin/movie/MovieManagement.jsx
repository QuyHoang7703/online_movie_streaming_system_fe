import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Input, Select, Space, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");

  // Mock data for movies
  useEffect(() => {
    const mockMovies = [
      {
        id: 1,
        title: "Inception",
        description: "A mind-bending thriller by Christopher Nolan.",
        director: "Christopher Nolan",
        releaseDate: "2010-07-16",
        country: "USA",
        isFree: false,
        movieType: "FEATURE",
        posterUrl: "https://via.placeholder.com/150", // Placeholder image
      },
      {
        id: 2,
        title: "Parasite",
        description: "A dark comedy thriller by Bong Joon-ho.",
        director: "Bong Joon-ho",
        releaseDate: "2019-05-30",
        country: "South Korea",
        isFree: true,
        movieType: "FEATURE",
        posterUrl: "https://via.placeholder.com/150", // Placeholder image
      },
      {
        id: 3,
        title: "Soul",
        description: "An animated movie by Pixar.",
        director: "Pete Docter",
        releaseDate: "2020-12-25",
        country: "USA",
        isFree: true,
        movieType: "ANIMATION",
        posterUrl: "https://via.placeholder.com/150", // Placeholder image
      },
    ];
    setMovies(mockMovies);
    setFilteredMovies(mockMovies);
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredMovies(filtered);
  };

  // Handle filter by type
  const handleFilterType = (value) => {
    setFilterType(value);
    const filtered = movies.filter((movie) =>
      value ? movie.movieType === value : true,
    );
    setFilteredMovies(filtered);
  };

  // Table columns
  const columns = [
    {
      title: "Poster",
      dataIndex: "posterUrl",
      key: "posterUrl",
      render: (url) => <Image width={50} src={url} alt="Poster" />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Director",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "Type",
      dataIndex: "movieType",
      key: "movieType",
      render: (type) => (
        <Tag color={type === "FEATURE" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Free",
      dataIndex: "isFree",
      key: "isFree",
      render: (isFree) => (
        <Tag color={isFree ? "green" : "red"}>{isFree ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button type="danger" size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Movie Management</h1>

      {/* Filters */}
      <Space style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Search by title"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by type"
          value={filterType}
          onChange={handleFilterType}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="FEATURE">Feature</Option>
          <Option value="ANIMATION">Animation</Option>
        </Select>
      </Space>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredMovies}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default MovieManagement;
