import React from "react";
import { Textarea } from "@material-tailwind/react";

function RenderTextarea({ field, form: { touched, errors }, ...props }) {
  return (
    <div className="relative pb-6">
      <Textarea
        {...field}
        {...props}
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

export default RenderTextarea;
