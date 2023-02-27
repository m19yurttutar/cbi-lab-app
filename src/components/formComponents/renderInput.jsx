import { Input } from "@material-tailwind/react";

export default function ({ field, form: { touched, errors }, ...props }) {
  return (
    <div className="relative pb-6">
      <Input
        {...field}
        {...props}
        containerProps={{ className: "min-w-[150px]" }}
        error={touched[field.name] && errors[field.name] && true}
        success={touched[field.name] && !errors[field.name] && true}
      />
      {touched[field.name] && errors[field.name] && (
        <span className="absolute bottom-2 text-xs text-red-500">
          {errors[field.name]}
        </span>
      )}
    </div>
  );
}
