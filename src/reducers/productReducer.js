import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  CLEAR_DATA,
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_PRODUCT_SPECIFICATION,
  CREATE_PRODUCT_SPECIFICATION,
} from "@/actions/types.js";

const initialState = {
  products: [],
  product: {},
  getProductsLoading: true,
  getProductLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: payload, getProductsLoading: false };

    case CREATE_PRODUCT:
      return { ...state, product: payload };

    case GET_PRODUCT:
      return { ...state, product: payload, getProductLoading: false };

    case UPDATE_PRODUCT:
      return {
        ...state,
        product: payload,
      };

    case CLEAR_DATA:
      return initialState;

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload.id),
      };

    case CREATE_PRODUCT_SPECIFICATION:
      return {
        ...state,
        product: {
          ...state.product,
          productDetail: {
            ...state.product.productDetail,
            specs: [...state.product.productDetail.specs, payload],
          },
        },
      };

    case DELETE_PRODUCT_SPECIFICATION:
      return {
        ...state,
        product: {
          ...state.product,
          productDetail: {
            ...state.product.productDetail,
            specs: state.product.productDetail.specs.filter(
              (comment) => comment.id !== payload.id
            ),
          },
        },
      };

    case CREATE_COMMENT:
      return {
        ...state,
        product: {
          ...state.product,
          productDetail: {
            ...state.product.productDetail,
            comments: [...state.product.productDetail.comments, payload],
          },
        },
      };

    case DELETE_COMMENT:
      return {
        ...state,
        product: {
          ...state.product,
          productDetail: {
            ...state.product.productDetail,
            comments: state.product.productDetail.comments.filter(
              (comment) => comment.id !== payload.id
            ),
          },
        },
      };

    default:
      return state;
  }
};
