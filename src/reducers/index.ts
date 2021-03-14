import orderReducer from "./Orders_reducer";
import { combineReducers } from "redux";

const indexReducer = combineReducers({
  orderReducer
});

export default indexReducer;
