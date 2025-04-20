import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "@styles/styles.css";
const InputSearch = ({ placeholder, value, onChange, loading }) => {
  return (
    <div>
      <Input
        placeholder={placeholder}
        value={value}
        prefix={
          <SearchOutlined className="mr-3 border-r-2 border-gray-500 p-1 text-lg" />
        }
        className="ant-input border-3 w-1/3 rounded-full p-2"
        onChange={onChange}
        loading={loading}
      />
    </div>
  );
};
export default InputSearch;
