import { Select } from "antd";

const SelectField = ({ error, ...props }) => {
  return (
    <div>
      <Select {...props} status={error ? "error" : undefined} />
      {error && (
        <div className="text-md mt-1 font-light text-red-500">{error}</div>
      )}
    </div>
  );
};

export default SelectField;
