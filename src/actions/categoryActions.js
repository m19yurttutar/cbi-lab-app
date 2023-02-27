import axios from "@/apis/axios.js";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  UPDATE_CATEGORY,
} from "@/actions/types.js";
import { toast } from "react-toastify";

export const getCategories = () => async (dispatch) => {
  axios
    .get("categories")
    .then((response) => {
      dispatch({ type: GET_ALL_CATEGORIES, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createCategory =
  (formValues, handleCategoryModal) => async (dispatch) => {
    axios
      .post("categories", formValues)
      .then((response) => {
        dispatch({ type: CREATE_CATEGORY, payload: response.data.data });
        handleCategoryModal();
        toast.success("Category has been created.", {
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

export const updateCategory =
  (formValues, handleCategoryModal) => async (dispatch) => {
    axios
      .put("categories", formValues)
      .then((response) => {
        dispatch({ type: UPDATE_CATEGORY, payload: formValues });
        handleCategoryModal();
        toast.success("Category has been updated.", {
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

export const deleteCategory = (id) => async (dispatch) => {
  axios
    .delete(`categories/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_CATEGORY, payload: { id } });
      toast.success("Category has been deleted.", {
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
