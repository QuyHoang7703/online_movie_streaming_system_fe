import { Select } from "antd";

const CustomSelectField = ({ error, ...props }) => (
  <div className="flex w-full flex-col">
    <Select {...props} status={error ? "error" : undefined} />
    <div className="mt-1 h-5">
      {error && <div className="text-sm font-light text-red-500">{error}</div>}
    </div>
  </div>
);
export default CustomSelectField;
