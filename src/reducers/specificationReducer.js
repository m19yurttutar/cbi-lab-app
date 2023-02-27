import {
  CREATE_SPECIFICATION,
  DELETE_SPECIFICATION,
  GET_ALL_SPECIFICATIONS,
  GET_SPECIFICATION,
  UPDATE_SPECIFICATION,
  CLEAR_DATA,
} from "@/actions/types.js";
import specification from "@/components/Specification.jsx";

const initialState = {
  specifications: [],
  specification: {},
  getSpecificationsLoading: true,
  getSpecificationLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_SPECIFICATIONS:
      return {
        ...state,
        specifications: payload,
        getSpecificationsLoading: false,
      };

    case CREATE_SPECIFICATION:
      return { ...state, specifications: [...state.specifications, payload] };

    case UPDATE_SPECIFICATION:
      return {
        ...state,
        specifications: state.specifications.map((specification) =>
          specification.id !== payload.id ? specification : payload
        ),
      };

    case CLEAR_DATA:
      return initialState;

    case DELETE_SPECIFICATION:
      return {
        ...state,
        specifications: state.specifications.filter(
          (specification) => specification.id !== payload.id
        ),
      };

    default:
      return state;
  }
};
