import {
  CaretRightFilled,
  HeartFilled,
  MessageFilled,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ActionButton from "@components/common/ActionButton";
import { Button } from "antd";

const MovieActions = () => {
  return (
    <div className="flex items-center gap-10">
      <Button
        size="large"
        className="!flex !items-center !gap-2 !rounded-full !border-none !bg-mainUserColor-100 !p-7 text-xl !font-medium !text-black hover:!opacity-90"
      >
        <CaretRightFilled className="relative top-[1px] text-2xl" />
        Xem Ngay
      </Button>
      <div className="flex gap-5">
        <ActionButton
          icon={<HeartFilled className="text-xl" />}
          text="Yêu thích"
          link="#"
        />
        <ActionButton
          icon={<PlusOutlined className="text-xl" />}
          text="Thêm vào"
          link="#"
        />
        <ActionButton
          icon={<MessageFilled className="text-xl" />}
          text="Bình luận"
          link="#"
        />
      </div>
    </div>
  );
};
export default MovieActions;
