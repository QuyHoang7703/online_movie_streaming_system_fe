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
  Radio,
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
import "@styles/styles.css";
const { Title } = Typography;
const { Option } = Select;

// Màu sắc cho biểu đồ (theme tối)
const COLORS = [
  "#8B5CF6",
  "#06D6A0",
  "#FFD60A",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
];

// Dữ liệu mẫu
const mockOverviewData = {
  totalUsers: 23,
  singleMovies: 2512,
  seriesMovies: 320,
  currentMonthRevenue: 5050000,
};

// Dữ liệu theo format API mới
const mockMonthlyData = [
  { month: 1, revenue: 25000000 },
  { month: 2, revenue: 28000000 },
  { month: 3, revenue: 32000000 },
  { month: 4, revenue: 35000000 },
  { month: 5, revenue: 38000000 },
  { month: 6, revenue: 42000000 },
  { month: 7, revenue: 45000000 },
  { month: 8, revenue: 48000000 },
  { month: 9, revenue: 46000000 },
  { month: 10, revenue: 50000000 },
  { month: 11, revenue: 52000000 },
  { month: 12, revenue: 55000000 },
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

const StatisticsDemo = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [statisticsType, setStatisticsType] = useState("monthly"); // "monthly" hoặc "yearly"
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2024);

  // Xử lý dữ liệu theo format API mới
  const processedMonthlyData = useMemo(() => {
    return mockMonthlyData.map((item) => ({
      month: `Tháng ${item.month}`,
      revenue: item.revenue,
    }));
  }, []);

  const processedYearlyData = useMemo(() => {
    return mockYearlyData.filter(
      (item) => item.year >= startYear && item.year <= endYear,
    );
  }, [startYear, endYear]);

  // Columns cho bảng thống kê thể loại
  const genreColumns = [
    {
      title: "Thể loại",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="font-medium text-gray-100">{text}</span>
      ),
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
        <span className="font-medium text-green-400">{percentage}%</span>
      ),
      sorter: (a, b) => parseFloat(a.percentage) - parseFloat(b.percentage),
    },
  ];

  // Custom tooltip cho biểu đồ
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-600 bg-gray-800 p-4 shadow-lg">
          <p className="mb-2 font-semibold text-gray-100">{label}</p>
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
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <Title level={2} className="mb-2 !text-gray-100">
          <BarChartOutlined className="mr-3 text-blue-400" />
          Thống kê hệ thống
        </Title>
        <p className="text-lg text-gray-300">
          Tổng quan về hoạt động của hệ thống xem phim trực tuyến
        </p>
      </div>

      {/* Thống kê tổng quan */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-gray-700 bg-gray-800 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title={<span className="text-gray-300">Tổng số người dùng</span>}
              value={mockOverviewData.totalUsers}
              prefix={<UserOutlined className="text-green-400" />}
              valueStyle={{
                color: "#10B981",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-gray-700 bg-gray-800 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title={<span className="text-gray-300">Phim lẻ</span>}
              value={mockOverviewData.singleMovies}
              prefix={<PlayCircleOutlined className="text-blue-400" />}
              valueStyle={{
                color: "#60A5FA",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-gray-700 bg-gray-800 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title={<span className="text-gray-300">Phim bộ</span>}
              value={mockOverviewData.seriesMovies}
              prefix={<VideoCameraOutlined className="text-purple-400" />}
              valueStyle={{
                color: "#A78BFA",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full border-gray-700 bg-gray-800 shadow-md transition-shadow hover:shadow-lg">
            <Statistic
              title={<span className="text-gray-300">Doanh thu tháng này</span>}
              value={mockOverviewData.currentMonthRevenue}
              prefix={<DollarOutlined className="text-red-400" />}
              suffix="VNĐ"
              valueStyle={{
                color: "#F87171",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Bộ lọc */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24}>
          <Card
            title={<span className="text-gray-100">🎛️ Bộ lọc thống kê</span>}
            className="border-gray-700 bg-gray-800 shadow-md"
          >
            <Row gutter={[24, 16]} align="middle">
              <Col xs={24} sm={6}>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                  Loại thống kê:
                </label>
                <Radio.Group
                  value={statisticsType}
                  onChange={(e) => setStatisticsType(e.target.value)}
                  size="large"
                  className="text-gray-100"
                >
                  <Radio.Button
                    value="monthly"
                    className="radio-url-btn text-gray-100"
                  >
                    Theo tháng
                  </Radio.Button>
                  <Radio.Button
                    value="yearly"
                    className="radio-url-btn text-gray-100"
                  >
                    Theo năm
                  </Radio.Button>
                </Radio.Group>
              </Col>

              {statisticsType === "monthly" ? (
                <Col xs={24} sm={6}>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
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
                </Col>
              ) : (
                <>
                  <Col xs={24} sm={6}>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Năm bắt đầu:
                    </label>
                    <Select
                      value={startYear}
                      onChange={setStartYear}
                      style={{ width: "100%" }}
                      size="large"
                    >
                      {Array.from({ length: 15 }, (_, i) => (
                        <Option key={2010 + i} value={2010 + i}>
                          {2010 + i}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={24} sm={6}>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Năm kết thúc:
                    </label>
                    <Select
                      value={endYear}
                      onChange={setEndYear}
                      style={{ width: "100%" }}
                      size="large"
                    >
                      {Array.from({ length: 15 }, (_, i) => (
                        <Option key={2010 + i} value={2010 + i}>
                          {2010 + i}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </>
              )}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ doanh thu */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24}>
          <Card
            title={
              <span className="text-gray-100">
                {statisticsType === "monthly"
                  ? `📊 Doanh thu và người dùng theo tháng năm ${selectedYear}`
                  : `📊 Doanh thu theo năm (${startYear} - ${endYear})`}
              </span>
            }
            className="border-gray-700 bg-gray-800 shadow-md"
          >
            <ResponsiveContainer width="100%" height={450}>
              {statisticsType === "monthly" ? (
                <BarChart
                  data={processedMonthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#D1D5DB" }}
                    tickLine={{ stroke: "#6B7280" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#D1D5DB" }}
                    tickLine={{ stroke: "#6B7280" }}
                    label={{
                      value: "Doanh thu (VNĐ)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "#D1D5DB" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#8B5CF6"
                    name="Doanh thu (VNĐ)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <BarChart
                  data={processedYearlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#D1D5DB" }}
                    tickLine={{ stroke: "#6B7280" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#D1D5DB" }}
                    tickLine={{ stroke: "#6B7280" }}
                    label={{
                      value: "Doanh thu (VNĐ)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "#D1D5DB" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    name="Doanh thu (VNĐ)"
                    radius={[4, 4, 0, 0]}
                  >
                    {processedYearlyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ phân bố thể loại */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card
            title={
              <span className="text-gray-100">
                🎭 Phân bố phim theo thể loại
              </span>
            }
            className="h-full border-gray-700 bg-gray-800 shadow-md"
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
                  stroke="#374151"
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
                  formatter={(value) => [value, "Số lượng phim"]}
                  labelFormatter={(label) => `Thể loại: ${label}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ color: "#D1D5DB" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title={
              <span className="text-gray-100">
                📋 Chi tiết phim theo thể loại
              </span>
            }
            className="h-full border-gray-700 bg-gray-800 shadow-md"
          >
            <Table
              columns={genreColumns}
              dataSource={mockGenreData}
              rowKey="name"
              pagination={{
                pageSize: 8,
                showSizeChanger: false,
                showQuickJumper: false,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} thể loại`,
              }}
              size="small"
              className="custom-table"
              style={{
                backgroundColor: "#1F2937",
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsDemo;
