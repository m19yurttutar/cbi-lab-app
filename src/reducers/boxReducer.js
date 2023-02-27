import {
  CREATE_BOX,
  DELETE_BOX,
  GET_ALL_BOXES,
  GET_BOX,
  UPDATE_BOX,
  CLEAR_DATA,
} from "@/actions/types.js";

const initialState = {
  boxes: [],
  box: {},
  getBoxesLoading: true,
  getBoxLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BOXES:
      return { ...state, boxes: payload, getBoxesLoading: false };

    case CREATE_BOX:
      return { ...state, boxes: [...state.boxes, payload] };

    case UPDATE_BOX:
      return {
        ...state,
        boxes: state.boxes.map((box) =>
          box.id !== payload.id ? box : payload
        ),
      };

    case CLEAR_DATA:
      return initialState;

    case DELETE_BOX:
      return {
        ...state,
        boxes: state.boxes.filter((box) => box.id !== payload.id),
      };

    default:
      return state;
  }
};
