import { Input } from "antd";

const InputField = ({ onChange, name, label, type, control }) => {
  console.log({ label });
  return (
    <div>
      <Input
        name={name}
        type={type}
        control={control}
        className="!bg-[#f6f2ee] !p-2"
        placeholder={` ${label}`}
        onChange={onChange}
      />
    </div>
  );
};
export default InputField;
