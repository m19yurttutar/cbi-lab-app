import axios from "@/apis/axios.js";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENTS,
  GET_COMMENT,
  UPDATE_COMMENT,
} from "@/actions/types.js";
import { toast } from "react-toastify";

export const getComments = () => async (dispatch) => {
  axios
    .get("comments")
    .then((response) => {
      dispatch({ type: GET_ALL_COMMENTS, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCommentWithDetails = (id) => async (dispatch) => {
  axios
    .get(`comments/detail/${id}`)
    .then((response) => {
      dispatch({ type: GET_COMMENT, payload: response.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createComment = (formValues, resetForm) => async (dispatch) => {
  axios
    .post("comments", formValues)
    .then((response) => {
      dispatch({ type: CREATE_COMMENT, payload: response.data.data });
      resetForm();
      toast.success("Comment has been created.", {
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

export const updateComment = (formValues) => async (dispatch) => {
  axios
    .put("comments", formValues)
    .then((response) => {
      dispatch({ type: UPDATE_COMMENT, payload: formValues });
      toast.success("Comment has been updated.", {
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

export const deleteComment = (id) => async (dispatch) => {
  axios
    .delete(`comments/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_COMMENT, payload: { id } });
      toast.success("Comment has been deleted.", {
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
