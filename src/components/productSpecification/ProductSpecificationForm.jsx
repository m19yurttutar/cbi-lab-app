import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import renderInput from "@/components/formComponents/renderInput.jsx";
import renderSelect from "@/components/formComponents/renderSelect.jsx";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

import { getSpecifications } from "@/actions/specificationActions.js";
import {
  createProductSpecification,
  updateProductSpecification,
} from "@/actions/productSpecificationActions.js";
import { clearData } from "@/actions/globalActions.js";

function ProductSpecificationForm(props) {
  const {
    productId,
    productSpecificationModal: { open, productSpecification },
    handleProductSpecModal,
    data: { specifications },
    loading,
  } = props;

  useEffect(() => {
    props.getSpecifications();
  }, []);

  const initialValues = productSpecification
    ? {
        productId: productSpecification.productId,
        specId: productSpecification.spec.id.toString(),
        specValue: productSpecification.specValue,
      }
    : {
        productId: productId,
        specId: "",
        specValue: "",
      };

  const validationSchema = Yup.object({
    specId: Yup.string().required("Required"),
    specValue: Yup.string().required("Required"),
  });

  const onSubmit = (formValues) => {
    productSpecification
      ? props.updateProductSpecification(
          { ...productSpecification, ...formValues },
          handleProductSpecModal
        )
      : props.createProductSpecification(formValues, handleProductSpecModal);
  };

  return (
    <Dialog
      open={open}
      handler={handleProductSpecModal}
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
            <DialogBody className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field
                name="specId"
                label="Specification"
                component={renderSelect}
                options={specifications.map((specification) => ({
                  value: specification.id,
                  text: specification.name,
                }))}
              />

              <Field
                name="specValue"
                label="Value"
                type="text"
                component={renderInput}
              />
            </DialogBody>
          )}
          <DialogFooter className="justify-between">
            <Button variant="text" color="red" onClick={handleProductSpecModal}>
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

const mapStateToProps = (state) => {
  const {
    specification: { specifications, getSpecificationsLoading },
  } = state;

  return { data: { specifications }, loading: getSpecificationsLoading };
};

export default connect(mapStateToProps, {
  getSpecifications,
  createProductSpecification,
  updateProductSpecification,
  clearData,
})(ProductSpecificationForm);
