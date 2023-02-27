import React, { useEffect } from "react";
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
import renderSelect from "@/components/formComponents/renderSelect.jsx";
import { connect } from "react-redux";
import { getCategories } from "@/actions/categoryActions.js";
import { getBoxes } from "@/actions/boxActions.js";
import { createProduct, updateProduct } from "@/actions/productActions.js";
import { clearData } from "@/actions/globalActions.js";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";

function ProductForm(props) {
  const {
    productModal: { open, product },
    handleProductModal,
    data: { categories, boxes },
    loading,
  } = props;

  const navigate = useNavigate();

  const handleNavigate = (id) => navigate(`${id}`);

  useEffect(() => {
    props.getCategories();
    props.getBoxes();
  }, []);

  const initialValues = product
    ? {
        name: product.name,
        categoryId: product.category.id.toString(),
        stockCount: product.stockCount,
        boxId: product.box.id.toString(),
        image: product.image,
      }
    : {
        name: "",
        categoryId: "",
        stockCount: "",
        boxId: "",
        image: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    categoryId: Yup.number().required("Required"),
    stockCount: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("Required"),
    boxId: Yup.number().required("Required"),
  });

  const onSubmit = (formValues) => {
    product
      ? props.updateProduct(
          { ...product, ...formValues },
          handleProductModal,
          handleNavigate
        )
      : props.createProduct(formValues, handleProductModal, handleNavigate);
  };

  return (
    <Dialog
      open={open}
      handler={handleProductModal}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="overflow-visible"
    >
      <DialogHeader className="justify-center">Product Form</DialogHeader>

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
                name="name"
                label="Name"
                type="text"
                component={renderInput}
              />

              <Field
                name="categoryId"
                label="Category"
                component={renderSelect}
                options={categories.map((category) => ({
                  value: category.id,
                  text: category.name,
                }))}
              />

              <Field
                name="stockCount"
                label="Stock Count"
                type="number"
                component={renderInput}
              />

              <Field
                name="boxId"
                label="Box"
                component={renderSelect}
                options={boxes.map((box) => ({
                  value: box.id,
                  text: box.name,
                }))}
              />
            </DialogBody>
          )}
          <DialogFooter className="justify-between">
            <Button variant="text" color="red" onClick={handleProductModal}>
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
    category: { categories, getCategoriesLoading },
    box: { boxes, getBoxesLoading },
  } = state;

  return {
    data: { categories, boxes },
    loading: getCategoriesLoading || getBoxesLoading,
  };
};

export default connect(mapStateToProps, {
  getCategories,
  getBoxes,
  createProduct,
  updateProduct,
  clearData,
})(ProductForm);
