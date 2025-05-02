import { Input } from "antd";

const CustomInputField = ({ error, ...props }) => (
  <div className="flex w-full flex-col">
    <Input {...props} status={error ? "error" : undefined} />
    <div className="mt-1 h-5">
      {error && <div className="text-sm font-light text-red-500">{error}</div>}
    </div>
  </div>
);
export default CustomInputField;
