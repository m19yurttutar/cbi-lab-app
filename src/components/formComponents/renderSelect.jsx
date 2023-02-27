import { Option, Select } from "@material-tailwind/react";

export default function (props) {
  const {
    field: { name, value, onBlur },
    form: { touched, errors, setFieldValue },
    label,
    options,
  } = props;

  return (
    <div className="relative pb-6">
      <Select
        name={name}
        label={label}
        value={value}
        onChange={(selectedValue) => setFieldValue(name, selectedValue)}
        onBlur={onBlur}
        error={touched[name] && errors[name] && true}
        success={touched[name] && !errors[name] && true}
        className="selectInput"
      >
        {options.map(({ value, text }, index) => (
          <Option key={index} value={value.toString()}>
            {text}
          </Option>
        ))}
      </Select>
      {touched[name] && errors[name] && (
        <span className="absolute bottom-2 text-xs text-red-500">
          {errors[name]}
        </span>
      )}
    </div>
  );
}
