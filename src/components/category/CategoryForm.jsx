import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import renderInput from "@/components/formComponents/renderInput.jsx";
import { connect } from "react-redux";
import { createCategory, updateCategory } from "@/actions/categoryActions.js";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

function CategoryForm(props) {
  const {
    categoryModal: { open, category },
    handleCategoryModal,
    loading,
  } = props;

  const initialValues = category
    ? {
        name: category.name,
      }
    : {
        name: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const onSubmit = (formValues) => {
    category
      ? props.updateCategory(
          { ...category, ...formValues },
          handleCategoryModal
        )
      : props.createCategory(formValues, handleCategoryModal);
  };

  return (
    <Dialog
      open={open}
      handler={handleCategoryModal}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="overflow-visible"
    >
      <DialogHeader className="justify-center">Category Form</DialogHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(formValues) => onSubmit(formValues)}
      >
        <Form>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DialogBody className="grid grid-cols-1">
              <Field
                name="name"
                label="Name"
                type="text"
                component={renderInput}
              />
            </DialogBody>
          )}
          <DialogFooter className="justify-between">
            <Button variant="text" color="red" onClick={handleCategoryModal}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" color="green">
              Submit
            </Button>
          </DialogFooter>
        </Form>
      </Formik>
    </Dialog>
  );
}

export default connect(null, {
  createCategory,
  updateCategory,
})(CategoryForm);
