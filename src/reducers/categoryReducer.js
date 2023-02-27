import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  CLEAR_DATA,
} from "@/actions/types.js";

const initialState = {
  categories: [],
  category: {},
  getCategoriesLoading: true,
  getCategoryLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_CATEGORIES:
      return { ...state, categories: payload, getCategoriesLoading: false };

    case CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, payload] };

    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id !== payload.id ? category : payload
        ),
      };

    case CLEAR_DATA:
      return initialState;

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload.id
        ),
      };

    default:
      return state;
  }
};
