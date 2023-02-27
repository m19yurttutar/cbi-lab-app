import { connect } from "react-redux";

import { createProduct } from "@/actions/productActions.js";

import ProductForm from "@/components/product/ProductForm";

function ProductCreate(props) {
  const { open, handleProductCreateModal } = props;
  const onSubmit = (formValues) => {
    props.createProduct(formValues);
  };

  return (
    <ProductForm
      open={open}
      handleProductCreateModal={handleProductCreateModal}
      onSubmit={onSubmit}
    />
  );
}

export default connect(null, {
  createProduct,
})(ProductCreate);
