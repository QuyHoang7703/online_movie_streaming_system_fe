import { useState, useEffect } from "react";

// Ngưỡng mặc định cho các loại variant
const THRESHOLDS = {
  default: 400, // Cho các preview phim top
  country: 350, // Cho preview phim theo quốc gia (nhỏ hơn)
};

/**
 * Custom hook để xử lý vị trí của preview card
 * @param {React.RefObject} ref - Ref của phần tử cần kiểm tra vị trí
 * @param {boolean} isVisible - Trạng thái hiển thị của preview (true/false)
 * @param {string} variant - Loại preview card (default hoặc country)
 * @param {number} customThreshold - Có thể ghi đè ngưỡng mặc định
 * @returns {boolean} isNearRightEdge - true nếu gần mép phải màn hình, ngược lại là false
 */
export const usePreviewPosition = (
  ref,
  isVisible,
  variant = "default",
  customThreshold,
) => {
  const [isNearRightEdge, setIsNearRightEdge] = useState(false);

  useEffect(() => {
    if (!isVisible || !ref.current) return;

    // Sử dụng ngưỡng tùy chỉnh hoặc ngưỡng theo variant
    const threshold =
      customThreshold || THRESHOLDS[variant] || THRESHOLDS.default;

    const checkPosition = () => {
      const rect = ref.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      // Nếu phần tử cách mép phải ít hơn threshold → đổi vị trí
      if (screenWidth - rect.left < threshold) {
        setIsNearRightEdge(true);
      } else {
        setIsNearRightEdge(false);
      }
    };

    // Kiểm tra vị trí ngay khi preview hiển thị
    checkPosition();

    // Kiểm tra lại khi resize cửa sổ
    window.addEventListener("resize", checkPosition);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkPosition);
    };
  }, [isVisible, ref, variant, customThreshold]);

  return isNearRightEdge;
};
