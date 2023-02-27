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
import {
  createSpecification,
  updateSpecification,
} from "@/actions/specificationActions.js";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

function SpecificationForm(props) {
  const {
    specificationModal: { open, specification },
    handleSpecificationModal,
    loading,
  } = props;

  const initialValues = specification
    ? {
        name: specification.name,
      }
    : {
        name: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const onSubmit = (formValues) => {
    specification
      ? props.updateSpecification(
          { ...specification, ...formValues },
          handleSpecificationModal
        )
      : props.createSpecification(formValues, handleSpecificationModal);
  };

  return (
    <Dialog
      open={open}
      handler={handleSpecificationModal}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="overflow-visible"
    >
      <DialogHeader className="justify-center">Specification Form</DialogHeader>

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
            <Button
              variant="text"
              color="red"
              onClick={handleSpecificationModal}
            >
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
  createSpecification,
  updateSpecification,
})(SpecificationForm);
