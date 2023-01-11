import clsx from "clsx";
import { NextPageContext, NextComponentType } from "next";
interface FormInputProps {
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  name?: string;
  id?: string;
  error?: string;
  label: string;
}
const FormInput: NextComponentType<NextPageContext, {}, FormInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "Placeholder",
  name = "Input",
  id = "input",
  error,
  label = "Input",
  onBlur
}) => (
  <div className="space-y-1 w-full">
    <label htmlFor={id} className="text-zinc-700 font-medium text-sm">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      className={clsx(
        "form-input p-4 font-medium rounded-lg focus:outline-none bg-white text-zinc-600 border-zinc-300 border w-full",
        error ? "border-red-500" : "focus:border-blue-500"
      )}
    />
    <p className="text-red-500 font-medium text-sm">{error}</p>
  </div>
);
export default FormInput;
