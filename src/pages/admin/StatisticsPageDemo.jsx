import React, { useState, useMemo } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Select,
  Space,
  Typography,
  Table,
  Tag,
} from "antd";
import {
  UserOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";

const { Title } = Typography;
const { Option } = Select;

// Màu sắc cho biểu đồ
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
];

// Dữ liệu mẫu
const mockOverviewData = {
  totalUsers: 12543,
  singleMovies: 1250,
  seriesMovies: 320,
  currentMonthRevenue: 45650000,
};

const mockMonthlyData = [
  { month: "Tháng 1", revenue: 25000000, users: 120 },
  { month: "Tháng 2", revenue: 28000000, users: 135 },
  { month: "Tháng 3", revenue: 32000000, users: 150 },
  { month: "Tháng 4", revenue: 35000000, users: 180 },
  { month: "Tháng 5", revenue: 38000000, users: 200 },
  { month: "Tháng 6", revenue: 42000000, users: 225 },
  { month: "Tháng 7", revenue: 45000000, users: 250 },
  { month: "Tháng 8", revenue: 48000000, users: 280 },
  { month: "Tháng 9", revenue: 46000000, users: 260 },
  { month: "Tháng 10", revenue: 50000000, users: 300 },
  { month: "Tháng 11", revenue: 52000000, users: 320 },
  { month: "Tháng 12", revenue: 55000000, users: 350 },
];

const mockYearlyData = [
  { year: 2020, revenue: 280000000 },
  { year: 2021, revenue: 350000000 },
  { year: 2022, revenue: 420000000 },
  { year: 2023, revenue: 480000000 },
  { year: 2024, revenue: 520000000 },
];

const mockGenreData = [
  { name: "Hành động", value: 180, percentage: "23.4" },
  { name: "Lãng mạn", value: 150, percentage: "19.5" },
  { name: "Kinh dị", value: 120, percentage: "15.6" },
  { name: "Hài hước", value: 100, percentage: "13.0" },
  { name: "Khoa học viễn tưởng", value: 80, percentage: "10.4" },
  { name: "Tâm lý", value: 70, percentage: "9.1" },
  { name: "Phiêu lưu", value: 50, percentage: "6.5" },
  { name: "Tài liệu", value: 20, percentage: "2.6" },
];

const StatisticsPageDemo = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearRange, setYearRange] = useState([2020, 2024]);

  // Columns cho bảng thống kê thể loại
  const genreColumns = [
    {
      title: "Thể loại",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Số lượng phim",
      dataIndex: "value",
      key: "value",
      render: (value) => <Tag color="blue">{value}</Tag>,
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Tỷ lệ (%)",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => (
        <span className="font-medium text-green-600">{percentage}%</span>
      ),
      sorter: (a, b) => parseFloat(a.percentage) - parseFloat(b.percentage),
    },
  ];

  // Custom tooltip cho biểu đồ
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
          <p className="mb-2 font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              <span className="font-medium">{entry.name}:</span>{" "}
              {typeof entry.value === "number"
                ? entry.value.toLocaleString("vi-VN")
                : entry.value}
              {entry.name.includes("Doanh thu") ? " VNĐ" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom label cho pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.05) return null; // Không hiển thị label cho phần nhỏ hơn 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Title level={2} className="mb-2 text-gray-800">
          <BarChartOutlined className="mr-3 text-blue-600" />
          Thống kê hệ thống
        </Title>
        <p className="text-lg text-gray-600">
          Tổng quan về hoạt động của hệ thống xem phim trực tuyến
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-0 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title="Tổng số người dùng"
              value={mockOverviewData.totalUsers}
              prefix={<UserOutlined className="text-green-600" />}
              valueStyle={{
                color: "#16a085",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-green-500">↗ +12%</span> so với tháng trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-0 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title="Phim lẻ"
              value={mockOverviewData.singleMovies}
              prefix={<PlayCircleOutlined className="text-blue-600" />}
              valueStyle={{
                color: "#3498db",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-blue-500">↗ +8%</span> so với tháng trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-0 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title="Phim bộ"
              value={mockOverviewData.seriesMovies}
              prefix={<VideoCameraOutlined className="text-purple-600" />}
              valueStyle={{
                color: "#9b59b6",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-purple-500">↗ +15%</span> so với tháng
              trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-0 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title="Doanh thu tháng này"
              value={mockOverviewData.currentMonthRevenue}
              prefix={<DollarOutlined className="text-red-600" />}
              suffix="VNĐ"
              valueStyle={{
                color: "#e74c3c",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-red-500">↗ +22%</span> so với tháng trước
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bộ lọc */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={12}>
          <Card title="🎛️ Bộ lọc thống kê" className="border-0 shadow-md">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Năm thống kê:
                </label>
                <Select
                  value={selectedYear}
                  onChange={setSelectedYear}
                  style={{ width: "100%" }}
                  size="large"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <Option key={2015 + i} value={2015 + i}>
                      {2015 + i}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Khoảng năm (doanh thu):
                </label>
                <Select
                  mode="multiple"
                  maxTagCount={2}
                  value={yearRange}
                  onChange={setYearRange}
                  style={{ width: "100%" }}
                  placeholder="Chọn khoảng năm"
                  size="large"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <Option key={2015 + i} value={2015 + i}>
                      {2015 + i}
                    </Option>
                  ))}
                </Select>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh thu và người dùng theo tháng */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24}>
          <Card
            title={`📊 Doanh thu và người dùng theo tháng năm ${selectedYear}`}
            className="border-0 shadow-md"
          >
            <ResponsiveContainer width="100%" height={450}>
              <ComposedChart
                data={mockMonthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#d9d9d9" }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#d9d9d9" }}
                  label={{
                    value: "Doanh thu (VNĐ)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#d9d9d9" }}
                  label={{
                    value: "Người dùng mới",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  fill="#3498db"
                  name="Doanh thu (VNĐ)"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="users"
                  stroke="#e74c3c"
                  strokeWidth={3}
                  name="Số người dùng mới"
                  dot={{ fill: "#e74c3c", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#e74c3c", strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh thu theo năm và phân bố thể loại */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={14}>
          <Card
            title="📈 Doanh thu theo năm"
            className="h-full border-0 shadow-md"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={mockYearlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#d9d9d9" }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#d9d9d9" }}
                  label={{
                    value: "Doanh thu (VNĐ)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="revenue"
                  name="Doanh thu (VNĐ)"
                  radius={[4, 4, 0, 0]}
                >
                  {mockYearlyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title="🎭 Phân bố phim theo thể loại"
            className="h-full border-0 shadow-md"
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={mockGenreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {mockGenreData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, "Số lượng phim"]}
                  labelFormatter={(label) => `Thể loại: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Bảng thống kê chi tiết theo thể loại */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title="📋 Chi tiết phim theo thể loại"
            className="border-0 shadow-md"
          >
            <Table
              columns={genreColumns}
              dataSource={mockGenreData}
              rowKey="name"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} thể loại`,
              }}
              size="middle"
              className="custom-table"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPageDemo;
