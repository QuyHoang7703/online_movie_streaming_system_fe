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
}) => {
  return (
    <div>
      <p className="mb-1 font-medium text-white">{label}</p>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, name } }) => {
          // console.log(name, value);
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              label={label}
              control={control}
              error={error}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;
