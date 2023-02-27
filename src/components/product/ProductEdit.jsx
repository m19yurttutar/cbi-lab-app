import { connect } from "react-redux";

import { updateProduct } from "@/actions/productActions.js";

import ProductForm from "@/components/product/ProductForm";

function ProductUpdate(props) {
  const { open, handleProductCreateModal } = props;
  const onSubmit = (formValues) => {
    props.updateProduct(formValues, handleProductCreateModal);
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
  updateProduct,
})(ProductUpdate);
