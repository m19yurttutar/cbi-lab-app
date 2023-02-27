import { combineReducers } from "redux";
import productReducer from "@/reducers/productReducer.js";
import categoryReducer from "@/reducers/categoryReducer.js";
import boxReducer from "@/reducers/boxReducer.js";
import specificationReducer from "@/reducers/specificationReducer.js";

export default combineReducers({
  product: productReducer,
  category: categoryReducer,
  box: boxReducer,
  specification: specificationReducer,
});
