import axios from "@/apis/axios.js";
import {
  CREATE_SPECIFICATION,
  DELETE_SPECIFICATION,
  GET_ALL_SPECIFICATIONS,
  UPDATE_SPECIFICATION,
} from "@/actions/types.js";
import { toast } from "react-toastify";

export const getSpecifications = () => async (dispatch) => {
  axios
    .get("specs")
    .then((response) => {
      dispatch({ type: GET_ALL_SPECIFICATIONS, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createSpecification =
  (formValues, handleSpecModal) => async (dispatch) => {
    axios
      .post("specs", formValues)
      .then((response) => {
        dispatch({ type: CREATE_SPECIFICATION, payload: response.data.data });
        handleSpecModal();
        toast.success("Spec has been created.", {
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

export const updateSpecification =
  (formValues, handleSpecModal) => async (dispatch) => {
    axios
      .put("specs", formValues)
      .then((response) => {
        console.log(formValues);
        dispatch({ type: UPDATE_SPECIFICATION, payload: formValues });
        handleSpecModal();
        toast.success("Spec has been updated.", {
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

export const deleteSpecification = (id) => async (dispatch) => {
  axios
    .delete(`specs/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_SPECIFICATION, payload: { id } });
      toast.success("Spec has been deleted.", {
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
