import { Modal } from "antd";
import "@styles/styles.css";
const GenericModal = ({ title, open, onCancel, Component, componentProps }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      title={<p className="mb-3 text-lg font-bold text-white">{title}</p>}
      destroyOnClose
      wrapClassName="custom-modal-wrapper"
    >
      {Component ? <Component {...componentProps} onCancel={onCancel} /> : null}
    </Modal>
  );
};
export default GenericModal;
