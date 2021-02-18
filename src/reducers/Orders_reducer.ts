import { ISelectedProducts, IOrderAction } from "../interfaces/interfaces";
import { setItem } from "../utils/localStorage";

const orderReducer = (state: ISelectedProducts, action: IOrderAction) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const key = `item${action.payload.id}`;
      state.selectedProducts[key] = {};
      state.preSelect.forEach((product, index) => {
        state.selectedProducts[key][`product${index}`] = product;
      });
      state.preSelect = [];
      setItem(state);
      return { ...state };
    case "REMOVE_PRODUCT":
      const product = Object.keys(state.selectedProducts).find(
        name => Number(name.slice(-1)) === action.payload.id
      );
      if (product) {
        delete state.selectedProducts[product];
      }
      setItem(state);
      return { ...state };
    case "PRE_ADD_PRODUCT":
      if (action.payload.productData) {
        state.preSelect.push(action.payload.productData);
      }
      setItem(state);
      return { ...state };
    case "PRE_REMOVE_PRODUCT":
      const productToDelete = state.preSelect.find(
        product => product.id === action.payload.id
      );
      productToDelete &&
        state.preSelect.splice(state.preSelect.indexOf(productToDelete), 1);
      setItem(state);
      return { ...state };
    default:
      return state;
  }
};
export default orderReducer;
