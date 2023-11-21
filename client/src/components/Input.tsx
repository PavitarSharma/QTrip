import React from "react";

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  type?: string;
}
const Input = ({
  type = "text",
  name,
  id,
  label,
  value,
  onChange,
  ...rest
}: InputProp) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className={`bg-gray-50 mb-3 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-0 block w-full p-2.5`}
      />
    </div>
  );
};

export default Input;
