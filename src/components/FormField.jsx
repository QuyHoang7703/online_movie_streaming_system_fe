import React from "react";
import { Controller } from "react-hook-form";

const FormField = ({
  control,
  name,
  label,
  type,
  // eslint-disable-next-line no-unused-vars
  Component,
  error,
  onChange,
  status,
  ...rest
}) => {
  return (
    <div>
      <p className="mb-1 font-medium text-white">{label}</p>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          // console.log(name, value);
          return (
            <Component
              {...field}
              // onChange={field.onChange}
              type={type}
              label={label ? label : ""}
              control={control}
              error={error}
              status={status}
              {...rest}
              // onChange={(e) => {
              //   field.onChange(e); // cập nhật form state
              //   if (onChange) onChange(e); // gọi hàm onChange truyền từ ngoài vào
              // }}
              onChange={(valueOrEvent) => {
                // Nếu là event (input), lấy value; nếu là Select, dùng trực tiếp
                const value =
                  valueOrEvent && valueOrEvent.target !== undefined
                    ? valueOrEvent.target.value
                    : valueOrEvent;
                field.onChange(value);
                if (onChange) onChange(valueOrEvent);
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;
