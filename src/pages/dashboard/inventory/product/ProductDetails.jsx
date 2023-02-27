import React, { useEffect, useState } from "react";
import {
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  TagIcon,
  ArrowLeftIcon,
  InboxIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid/index.js";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getProductWithDetails } from "@/actions/productActions.js";
import { clearData } from "@/actions/globalActions.js";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import avatar from "/img/team-3.jpeg";
import Comment from "@/components/Comment.jsx";
import CommentForm from "@/components/comment/CommentForm.jsx";
import ProductSpecificationForm from "@/components/productSpecification/ProductSpecificationForm.jsx";
import Specification from "@/components/Specification";

function ProductDetails(props) {
  let { id } = useParams();
  const { product, loading } = props;

  const initialProductSpecificationModal = {
    open: false,
    productSpecification: null,
  };

  const [productSpecificationModal, setProductSpecificationModal] = useState(
    initialProductSpecificationModal
  );

  const handleProductSpecModal = (productSpecification) => {
    productSpecificationModal.open
      ? setProductSpecificationModal(initialProductSpecificationModal)
      : setProductSpecificationModal({
          open: true,
          productSpecification: productSpecification,
        });
  };

  useEffect(() => {
    props.getProductWithDetails(id);

    return () => props.clearData();
  }, []);

  return (
    <section className="relative mt-20 py-16 px-4">
      {productSpecificationModal.open && (
        <ProductSpecificationForm
          productId={id}
          productSpecificationModal={productSpecificationModal}
          handleProductSpecModal={() => handleProductSpecModal(null)}
        />
      )}
      <div className="container mx-auto">
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
          {loading ? (
            <div className="my-4">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="px-6">
              <div className="absolute left-0 top-0">
                <Link to={"/dashboard/products"}>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    className="rounded-none rounded-tl-3xl rounded-br-3xl p-6"
                  >
                    <ArrowLeftIcon className="h-6 w-6" />
                  </IconButton>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 sm:order-2 sm:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src={avatar}
                        alt="Product Image"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 sm:order-3 sm:w-4/12">
                  <div className="flex justify-center py-4 lg:pt-4">
                    <div className="p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {product.productDetail.comments.length}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Comments
                      </Typography>
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 sm:order-1 sm:w-4/12">
                  <div className="flex justify-center py-4 lg:pt-4">
                    <div className="p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {product.productDetail.specs.length}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Specifications
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-4">
                  {product.product.name}
                </Typography>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Chip
                    icon={<TagIcon />}
                    value={product.product.category.name}
                  />
                  <Chip icon={<InboxIcon />} value={product.product.box.name} />
                </div>
              </div>

              <div className="border-y border-blue-gray-50 py-8 lg:py-16">
                <div className="mx-auto max-w-2xl px-4">
                  <div className="mb-5 flex justify-between">
                    <Typography variant="h4" className="text-gray-700">
                      {`Specifications (${product.productDetail.specs.length})`}
                    </Typography>
                    <Tooltip
                      content="Add New"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleProductSpecModal(null)}
                      >
                        <PlusIcon className="h-6 w-6" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className="grid-col-1 grid gap-x-6 gap-y-10 sm:gap-y-16 lg:grid-cols-2 lg:gap-x-8">
                    {product.productDetail.specs.map((productSpec, index) => (
                      <Specification
                        key={index}
                        productSpec={productSpec}
                        handleProductSpecModal={handleProductSpecModal}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-8 lg:py-16">
                <div className="mx-auto max-w-2xl px-4">
                  <div className="mb-5">
                    <Typography variant="h4" className="text-gray-700">
                      {`Comments (${product.productDetail.comments.length})`}
                    </Typography>
                  </div>
                  <div className="mb-5">
                    <CommentForm productId={id} />
                  </div>
                  <div>
                    {[...product.productDetail.comments]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((comment, index) => (
                        <Comment key={index} comment={comment} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  const {
    product: { product, getProductLoading },
  } = state;

  return { product, loading: getProductLoading };
};

export default connect(mapStateToProps, {
  getProductWithDetails,
  clearData,
})(ProductDetails);
