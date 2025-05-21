import { Steps } from "antd";
import "@styles/user/styles.css";
import { CheckCircle, PaymentRounded, ShoppingCart } from "@mui/icons-material";
import {
  CheckCircleFilled,
  CreditCardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
const StepProgress = ({ current = 0 }) => {
  const items = [
    {
      title: "Chọn gói",
      icon: (
        <ShoppingCartOutlined
          style={{ fontSize: 28 }}
          className="custom-step-icon"
        />
      ),
    },
    {
      title: "Thanh toán",
      icon: (
        <CreditCardOutlined
          style={{ fontSize: 28 }}
          className="custom-step-icon"
        />
      ),
    },
    {
      title: "Kết quả",
      icon: (
        <CheckCircleFilled
          style={{ fontSize: 28 }}
          className="custom-step-icon"
        />
      ),
    },
  ];

  return (
    <div className="mx-auto mb-5 mt-8 w-[70%]">
      <Steps current={current} items={items} className="custom-steps" />
    </div>
  );
};

export default StepProgress;
