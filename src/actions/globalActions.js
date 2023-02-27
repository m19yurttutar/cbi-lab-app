import { CLEAR_DATA } from "./types";

export const clearData = () => async (dispatch) => {
  dispatch({ type: CLEAR_DATA, payload: {} });
};
