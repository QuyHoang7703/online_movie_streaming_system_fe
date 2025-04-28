import { Button } from "antd";

/**
 * Modal confirm xóa dùng chung cho nhiều entity
 * @param {string} itemName - Tên của item cần xóa
 * @param {string} itemType - Loại của item ("thể loại", "phim", "người dùng", etc.)
 * @param {Function} onConfirm - Hàm callback khi xác nhận xóa
 * @param {Function} onCancel - Hàm callback khi hủy
 */
const ConfirmDeleteModal = ({ itemName, itemType, onConfirm, onCancel }) => {
  return (
    <div>
      <p className="text-base font-bold text-white">
        Bạn có muốn xóa {itemType}
        <span className="text-yellow-400">"{itemName}"</span> này không?
      </p>

      <div className="mt-5 flex justify-end gap-4">
        <Button variant="solid" color="cyan" onClick={onConfirm} size="large">
          Xóa
        </Button>
        <Button variant="solid" color="danger" onClick={onCancel} size="large">
          Thoát
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDeleteModal;
