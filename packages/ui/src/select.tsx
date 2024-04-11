import { ChangeEventHandler } from "react";

interface optionType {
  key: string;
  label: string;
}
export default function Select({
  options,
  label,
  onChange,
}: {
  options: optionType[];
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        defaultValue={options.length > 0 ? options[0]?.key : ""}
        onChange={onChange}
      >
        {options.map((option) => {
          return <option value={option.key}>{option.label}</option>;
        })}
      </select>
    </>
  );
}
