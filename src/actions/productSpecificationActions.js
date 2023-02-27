import axios from "@/apis/axios.js";
import {
  CREATE_PRODUCT_SPECIFICATION,
  DELETE_PRODUCT_SPECIFICATION,
  UPDATE_PRODUCT_SPECIFICATION,
} from "@/actions/types.js";
import { toast } from "react-toastify";

export const createProductSpecification =
  (formValues, handleProductSpecificationModal) => async (dispatch) => {
    axios
      .post("productSpec", formValues)
      .then((response) => {
        dispatch({
          type: CREATE_PRODUCT_SPECIFICATION,
          payload: response.data.data,
        });
        handleProductSpecificationModal();
        toast.success("Product Specification has been created.", {
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

export const updateProductSpecification =
  (formValues, handleProductSpecificationModal) => async (dispatch) => {
    axios
      .delete(`productSpec/${formValues.id}`)
      .then(() => {
        axios.post("productSpec", formValues).then((response) => {
          dispatch({
            type: DELETE_PRODUCT_SPECIFICATION,
            payload: { id: formValues.id },
          });
          dispatch({
            type: CREATE_PRODUCT_SPECIFICATION,
            payload: response.data.data,
          });
          handleProductSpecificationModal();
          toast.success("Product Specification has been updated.", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
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

export const deleteProductSpecification = (id) => async (dispatch) => {
  axios
    .delete(`productSpec/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_PRODUCT_SPECIFICATION, payload: { id } });
      toast.success("Product Specification has been deleted.", {
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
