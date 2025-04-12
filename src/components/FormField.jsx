import React from "react";
import { Controller } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
const FormField = ({ control, name, label, type, Component }) => {
  return (
    <div>
      <p className="mb-1 font-medium text-white">{label}</p>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              onChange={onChange}
              value={value}
              name={name}
              type={type}
              label={label}
              control={control}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;
