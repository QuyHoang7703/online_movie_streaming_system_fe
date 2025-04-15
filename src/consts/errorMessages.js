export const ERROR_MESSAGES = {
  // Auth errors
  "Bad credentials": "Email hoặc mật khẩu không chính xác",
  "User not exists with email": "Tài khoản không tồn tại",
  "Email already exists": "Email đã được sử dụng",
  "Password is incorrect": "Mật khẩu không chính xác",
  "Token is expired": "Phiên đăng nhập đã hết hạn",
  "Token is invalid": "Phiên đăng nhập không hợp lệ",

  // Validation errors
  "Email is required": "Vui lòng nhập email",
  "Password is required": "Vui lòng nhập mật khẩu",
  "Email is invalid": "Email không hợp lệ",
  "Password must be at least 6 characters": "Mật khẩu phải có ít nhất 6 ký tự",

  // Default message
  default: "Có lỗi xảy ra, vui lòng thử lại",
};

export const mapErrorMessage = (message) => {
  // Kiểm tra match chính xác trước
  if (ERROR_MESSAGES[message]) {
    return ERROR_MESSAGES[message];
  }

  // Kiểm tra prefix patterns
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (message?.startsWith(key)) {
      // Lấy phần email từ message gốc
      // const email = message.replace(key, "").trim();
      return `${value}`;
    }
  }

  return ERROR_MESSAGES.default;
};
