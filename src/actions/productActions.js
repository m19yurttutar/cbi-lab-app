import axios from "@/apis/axios.js";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
} from "@/actions/types.js";
import { toast } from "react-toastify";

export const getProducts = () => async (dispatch) => {
  axios
    .get("products")
    .then((response) => {
      dispatch({ type: GET_ALL_PRODUCTS, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductWithDetails = (id) => async (dispatch) => {
  axios
    .get(`products/detail/${id}`)
    .then((response) => {
      dispatch({ type: GET_PRODUCT, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct =
  (formValues, handleProductModal, handleNavigate) => async (dispatch) => {
    axios
      .post("products", formValues)
      .then((response) => {
        dispatch({ type: CREATE_PRODUCT, payload: response.data.data });
        handleProductModal();
        handleNavigate(response.data.data.id);
        toast.success("Product has been created.", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Please try again later.", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      });
  };

export const updateProduct =
  (formValues, handleProductModal, handleNavigate) => async (dispatch) => {
    axios
      .put("products", formValues)
      .then((response) => {
        console.log(formValues);
        dispatch({ type: UPDATE_PRODUCT, payload: formValues });
        handleProductModal();
        handleNavigate(formValues.id);
        toast.success("Product has been updated.", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Please try again later.", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      });
  };

export const deleteProduct = (id) => async (dispatch) => {
  axios
    .delete(`products/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_PRODUCT, payload: { id } });
      toast.success("Product has been deleted.", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong! Please try again later.", {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    });
};
