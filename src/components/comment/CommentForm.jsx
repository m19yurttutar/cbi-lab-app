import React from "react";
import { Field, Form, Formik } from "formik";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import { Button, DialogBody, DialogFooter } from "@material-tailwind/react";
import renderInput from "@/components/formComponents/renderInput.jsx";
import * as Yup from "yup";
import renderTextarea from "@/components/formComponents/renderTextarea.jsx";
import { connect } from "react-redux";
import { createComment } from "@/actions/commentActions.js";

function CommentForm(props) {
  const { productId } = props;

  const initialValues = {
    author: "",
    description: "",
    productId: productId,
  };

  const validationSchema = Yup.object({
    author: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const onSubmit = (formValues, resetForm) => {
    props.createComment(formValues, resetForm);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(formValues, { resetForm }) => onSubmit(formValues, resetForm)}
    >
      <Form>
        <Field name="author" label="Author" component={renderInput} />

        <Field name="description" label="Comment" component={renderTextarea} />

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" color="green">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default connect(null, {
  createComment,
})(CommentForm);
