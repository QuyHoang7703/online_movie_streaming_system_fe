import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import "@styles/styles.css";
import InputSearch from "@components/InputSearch";
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
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditFilled />} size="large" type="primary" />
        <Button icon={<DeleteFilled />} size="large" type="primary" danger />
      </Space>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Thể loại 1",
    description: "Mô tả thể loại 1",
  },
  {
    id: 2,
    name: "Thể loại 2",
    description: "Mô tả thể loại 2",
  },
];
const GenreManagement = () => {
  return (
    <div className="bg-dark-200 h-full p-7">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-white sm:text-2xl">
          Danh sách thể loại
        </p>
        <Button
          className="bg-createButton hover:!bg-createButton/80 border-none p-5 font-bold text-white hover:text-white"
          type="primary"
        >
          Tạo thể loại
        </Button>
      </div>
      <div className="mt-5">
        <InputSearch placeholder="Tìm kiếm thể loại" />
      </div>
      <div className="bg-dark-100 mt-5 rounded-lg p-7">
        <p className="mb-3 text-lg font-bold text-white">Thông tin thể loại</p>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          // rowClassName="bg-dark-100 text-white hover:bg-dark-100"
          rowClassName={() => "hover:bg-transparent"}
          className="custom-table"
        ></Table>
      </div>
    </div>
  );
};
export default GenreManagement;
