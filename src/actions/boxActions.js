import axios from "@/apis/axios.js";
import {
  CREATE_BOX,
  DELETE_BOX,
  GET_ALL_BOXES,
  UPDATE_BOX,
} from "@/actions/types.js";
import { toast } from "react-toastify";

export const getBoxes = () => async (dispatch) => {
  axios
    .get("boxes")
    .then((response) => {
      dispatch({ type: GET_ALL_BOXES, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createBox = (formValues, handleBoxModal) => async (dispatch) => {
  axios
    .post("boxes", formValues)
    .then((response) => {
      dispatch({ type: CREATE_BOX, payload: response.data.data });
      handleBoxModal();
      toast.success("Box has been created.", {
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

export const updateBox = (formValues, handleBoxModal) => async (dispatch) => {
  axios
    .put("boxes", formValues)
    .then((response) => {
      dispatch({ type: UPDATE_BOX, payload: formValues });
      handleBoxModal();
      toast.success("Box has been updated.", {
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

export const deleteBox = (id) => async (dispatch) => {
  axios
    .delete(`boxes/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_BOX, payload: { id } });
      toast.success("Box has been deleted.", {
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
