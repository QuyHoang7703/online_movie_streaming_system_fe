import { Input } from "antd";

const InputField = ({ onChange, name, label, type, control, error, value }) => {
  return (
    <div>
      <Input
        name={name}
        type={type}
        control={control}
        className="!bg-[#f6f2ee] !p-2"
        placeholder={` ${label}`}
        onChange={onChange}
        value={value} // giữ nguyên
        status={error ? "error" : ""}
        // defaultValue={value}
      />
      {error && <p className="mt-2 text-sm font-light text-red-500">{error}</p>}
    </div>
  );
};
export default InputField;
