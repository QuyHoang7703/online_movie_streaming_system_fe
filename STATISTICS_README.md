# Trang Thống Kê Hệ Thống Xem Phim Trực Tuyến (Dark Theme)

## Tổng quan

Tôi đã tạo cho bạn một trang thống kê hoàn chỉnh cho hệ thống xem phim trực tuyến với **theme tối** và các tính năng sau:

### 🎯 Các tính năng chính

1. **Thống kê tổng quan** (4 cards chính):

   - Tổng số người dùng
   - Số lượng phim lẻ
   - Số lượng phim bộ
   - Doanh thu tháng hiện tại

2. **Lựa chọn loại thống kê**:

   - **Theo tháng**: Hiển thị biểu đồ kết hợp doanh thu + người dùng mới theo 12 tháng
   - **Theo năm**: Hiển thị biểu đồ doanh thu theo khoảng năm tùy chọn

3. **Biểu đồ doanh thu và người dùng theo tháng**:

   - Biểu đồ kết hợp (ComposedChart) với Bar + Line
   - Hiển thị doanh thu theo cột và số người dùng mới theo đường
   - Chọn năm để xem dữ liệu

4. **Biểu đồ doanh thu theo năm**:

   - Bar chart với màu sắc khác nhau cho mỗi năm
   - Chọn năm bắt đầu và kết thúc tùy ý

5. **Biểu đồ phân bố phim theo thể loại**:

   - Pie chart với màu sắc đẹp mắt cho theme tối
   - Hiển thị phần trăm cho mỗi thể loại

6. **Bảng chi tiết phim theo thể loại**:
   - Table với khả năng sắp xếp
   - Phân trang và styling cho theme tối

### 🌙 Theme Tối

- Background màu xám đậm (#1F2937, #374151)
- Text màu sáng (#F3F4F6, #D1D5DB)
- Cards với border và background tối
- Tooltips và components đều được styling cho theme tối

### 📊 Bộ lọc nâng cao

- **Radio Button**: Chọn "Theo tháng" hoặc "Theo năm"
- **Theo tháng**: Hiển thị dropdown chọn năm
- **Theo năm**: Hiển thị 2 dropdown chọn năm bắt đầu và kết thúc

## 📁 Cấu trúc file

### Các file đã tạo:

1. **src/service/admin/statisticsApi.js**

   - API service cho các endpoint thống kê
   - Sử dụng RTK Query
   - Các endpoint:
     - `/admin/statistics/overview` - Thống kê tổng quan
     - `/admin/statistics/monthly-revenue` - Doanh thu theo tháng
     - `/admin/statistics/yearly-revenue` - Doanh thu theo năm
     - `/admin/statistics/users` - Thống kê người dùng
     - `/admin/statistics/movies-by-genre` - Phim theo thể loại

2. **src/pages/admin/StatisticsPage.jsx**

   - Component chính cho trang thống kê thật
   - Kết nối với API backend
   - Theme tối và logic chọn tháng/năm

3. **src/components/StatisticsDemo.jsx**

   - Component demo với dữ liệu mẫu
   - Theme tối và tất cả tính năng mới
   - Sử dụng để test giao diện

4. **src/pages/TestStatistics.jsx**
   - Trang wrapper để test component demo

### Route đã thêm:

- `/admin/statistics` - Trang thống kê (chỉ admin)

## 🚀 Cách sử dụng

### 1. Chạy project

```bash
npm run dev
```

### 2. Truy cập trang thống kê

- Đăng nhập với tài khoản admin
- Truy cập: `http://localhost:5173/admin/statistics`

### 3. Kết nối Backend

Khi backend của bạn sẵn sàng, hãy thay đổi:

- Trong `src/routes/index.jsx`: Thay `<TestStatistics />` thành `<StatisticsPage />`
- Import `StatisticsPage` thay vì `TestStatistics`

```jsx
// Thay đổi từ:
import TestStatistics from "@pages/TestStatistics";

// Thành:
import StatisticsPage from "@pages/admin/StatisticsPage";
```

## 🎨 Thư viện sử dụng

### Đã có sẵn:

- **Ant Design** (antd) - UI components
- **Tailwind CSS** - Styling
- **@ant-design/icons** - Icons

### Đã cài thêm:

- **Recharts** - Thư viện biểu đồ React

## 📡 API Expected Format (CẬP NHẬT MỚI)

### GET `/admin/statistics/overview`

```json
{
  "data": {
    "totalUsers": 12543,
    "singleMovies": 1250,
    "seriesMovies": 320,
    "currentMonthRevenue": 45650000
  }
}
```

### GET `/admin/statistics/monthly-revenue?year=2024` (FORMAT MỚI)

```json
{
  "data": [
    { "month": 1, "revenue": 25000000 },
    { "month": 2, "revenue": 28000000 },
    { "month": 3, "revenue": 32000000 },
    { "month": 4, "revenue": 35000000 },
    { "month": 5, "revenue": 38000000 },
    { "month": 6, "revenue": 42000000 },
    { "month": 7, "revenue": 45000000 },
    { "month": 8, "revenue": 48000000 },
    { "month": 9, "revenue": 46000000 },
    { "month": 10, "revenue": 50000000 },
    { "month": 11, "revenue": 52000000 },
    { "month": 12, "revenue": 55000000 }
  ]
}
```

### GET `/admin/statistics/yearly-revenue?startYear=2020&endYear=2024`

```json
{
  "data": [
    { "year": 2020, "revenue": 280000000 },
    { "year": 2021, "revenue": 350000000 },
    { "year": 2022, "revenue": 420000000 },
    { "year": 2023, "revenue": 480000000 },
    { "year": 2024, "revenue": 520000000 }
  ]
}
```

### GET `/admin/statistics/users?year=2024`

```json
{
  "data": [
    { "month": 1, "users": 120 },
    { "month": 2, "users": 135 },
    { "month": 3, "users": 150 },
    { "month": 4, "users": 180 },
    { "month": 5, "users": 200 },
    { "month": 6, "users": 225 },
    { "month": 7, "users": 250 },
    { "month": 8, "users": 280 },
    { "month": 9, "users": 260 },
    { "month": 10, "users": 300 },
    { "month": 11, "users": 320 },
    { "month": 12, "users": 350 }
  ]
}
```

### GET `/admin/statistics/movies-by-genre`

```json
{
  "data": [
    { "genreName": "Hành động", "count": 180 },
    { "genreName": "Lãng mạn", "count": 150 },
    { "genreName": "Kinh dị", "count": 120 },
    { "genreName": "Hài hước", "count": 100 },
    { "genreName": "Khoa học viễn tưởng", "count": 80 },
    { "genreName": "Tâm lý", "count": 70 },
    { "genreName": "Phiêu lưu", "count": 50 },
    { "genreName": "Tài liệu", "count": 20 }
  ]
}
```

## 🎯 Tính năng nâng cao có thể thêm

1. **Export dữ liệu**: Xuất biểu đồ thành PDF/Excel
2. **Real-time updates**: WebSocket cho cập nhật real-time
3. **Biểu đồ tương tác**: Drill-down, zoom, filter
4. **Dashboard tùy chỉnh**: Cho phép admin tùy chỉnh layout
5. **Báo cáo định kỳ**: Gửi báo cáo qua email
6. **Theme switcher**: Chuyển đổi giữa dark/light theme

## 🔧 Customize

### Thay đổi màu sắc biểu đồ (Dark Theme):

```jsx
const COLORS = [
  "#8B5CF6", // Purple
  "#06D6A0", // Green
  "#FFD60A", // Yellow
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Light Green
  "#FFEAA7", // Light Yellow
];
```

### Thay đổi format số:

```jsx
{
  entry.value.toLocaleString("vi-VN");
}
```

### Thêm biểu đồ mới:

1. Thêm endpoint mới trong `statisticsApi.js`
2. Thêm component biểu đồ mới trong StatisticsPage
3. Xử lý dữ liệu với `useMemo`

## 🌟 Các thay đổi mới

### ✅ Đã cập nhật:

- **Theme tối hoàn toàn** với màu sắc chuyên nghiệp
- **Radio button** chọn loại thống kê (tháng/năm)
- **Bộ lọc thông minh**: Tháng → chọn năm, Năm → chọn khoảng năm
- **Format API mới** với `{ "month": 1, "revenue": 0.0 }`
- **Biểu đồ responsive** với màu sắc phù hợp theme tối
- **Tooltips và labels** được styling cho theme tối

### 🎨 Style đặc biệt:

- Cards với `border-gray-700` và `bg-gray-800`
- Text màu `text-gray-100`, `text-gray-300`
- Biểu đồ với stroke và fill màu sáng
- Tooltips với background tối

Chúc bạn thành công với dự án! 🎉
