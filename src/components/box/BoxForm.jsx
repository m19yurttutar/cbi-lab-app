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
import { createBox, updateBox } from "@/actions/boxActions.js";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

function BoxForm(props) {
  const {
    boxModal: { open, box },
    handleBoxModal,
    loading,
  } = props;

  const initialValues = box
    ? {
        name: box.name,
      }
    : {
        name: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const onSubmit = (formValues) => {
    box
      ? props.updateBox({ ...box, ...formValues }, handleBoxModal)
      : props.createBox(formValues, handleBoxModal);
  };

  return (
    <Dialog
      open={open}
      handler={handleBoxModal}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="overflow-visible"
    >
      <DialogHeader className="justify-center">Box Form</DialogHeader>

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
            <Button variant="text" color="red" onClick={handleBoxModal}>
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
  createBox,
  updateBox,
})(BoxForm);
