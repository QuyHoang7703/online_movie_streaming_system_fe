// src/consts/statusMovie.js
export const MOVIE_STATUS_OPTIONS = [
  { value: "Rumored", label: "Tin đồn" },
  { value: "Planned", label: "Đã lên kế hoạch" },
  { value: "In Production", label: "Đang sản xuất" },
  { value: "Post Production", label: "Hậu kỳ" },
  { value: "Released", label: "Đã phát hành" },
  { value: "Canceled", label: "Đã hủy" },
];

export const TV_STATUS_OPTIONS = [
  { value: "Returning Series", label: "Đang phát sóng tiếp" },
  { value: "Planned", label: "Đã lên kế hoạch" },
  { value: "In Production", label: "Đang sản xuất" },
  { value: "Ended", label: "Đã kết thúc" },
  { value: "Canceled", label: "Đã hủy" },
  { value: "Pilot", label: "Tập thử nghiệm" },
];

// Hàm lấy options theo type
export function getStatusOptionsByType(type) {
  if (type === "STANDALONE") return MOVIE_STATUS_OPTIONS;
  if (type === "SERIES") return TV_STATUS_OPTIONS;
  return [];
}
