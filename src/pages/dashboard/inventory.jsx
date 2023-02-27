import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { connect } from "react-redux";

import { getProducts, deleteProduct } from "@/actions/productActions.js";
import { clearData } from "@/actions/globalActions.js";

import IndexTable from "@/components/IndexTable.jsx";
import TableButtons from "@/components/TableButtons.jsx";

import ProductForm from "@/components/product/ProductForm";

function Inventory(props) {
  const { products, loading } = props;

  const initialProductModal = { open: false, product: null };

  const [productModal, setProductModal] = useState(initialProductModal);

  const handleProductModal = (product) => {
    productModal.open
      ? setProductModal(initialProductModal)
      : setProductModal({ open: true, product: product });
  };

  useEffect(() => {
    props.getProducts();

    return () => props.clearData();
  }, []);

  const renderRows = () => {
    return products.map((product, index) => {
      const className = `py-3 px-5 text-center ${
        index === products.length - 1 ? "" : "border-b border-blue-gray-50"
      }`;

      return (
        <tr key={index}>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {index + 1}
            </Typography>
          </td>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {product.name}
            </Typography>
          </td>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {product.category.name}
            </Typography>
          </td>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {product.box.name}
            </Typography>
          </td>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {product.stockCount}
            </Typography>
          </td>
          <td className={className}>
            <TableButtons
              id={product.id}
              deleteFunction={props.deleteProduct}
              handleProductModal={() => handleProductModal(product)}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {productModal.open && (
        <ProductForm
          productModal={productModal}
          handleProductModal={() => handleProductModal(null)}
        />
      )}

      <IndexTable
        headers={[
          "#",
          "product name",
          "category name",
          "box name",
          "stock count",
          "",
        ]}
        renderRows={products.length > 0 ? renderRows() : null}
        handleProductModal={() => handleProductModal(null)}
        loading={loading}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    product: { products, getProductsLoading },
  } = state;

  return { products, loading: getProductsLoading };
};

export default connect(mapStateToProps, {
  getProducts,
  deleteProduct,
  clearData,
})(Inventory);
