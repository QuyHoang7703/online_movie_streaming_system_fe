import { Alert, App } from "antd";

export const useNotification = () => {
  const { message, notification } = App.useApp();
  const showSuccessMessage = (msg) => {
    message.success(msg);
  };

  const showErrorMessage = (msg) => {
    message.error(msg);
  };
  const showNotification = (type, title, description) => {
    notification[type]({
      message: title,
      description,
      placement: "topRight",
    });
  };

  return {
    showSuccessMessage,
    showErrorMessage,
    showNotification,
  };
};
