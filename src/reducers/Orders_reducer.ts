import { ISelectedProducts, IOrderAction } from "../interfaces/interfaces";
import { setStorage } from "../utils/localStorage";
import selectedProducts from "../stores/SelectedProducts_store";
import * as ordersActionTypes from "../actionTypes/Orders_actionTypes";

const orderReducer = (
  state: ISelectedProducts = selectedProducts,
  action: IOrderAction
) => {
  switch (action.type) {
    case ordersActionTypes.ADD_PRODUCT: {
      const key = `item${action.payload.id}`;
      state.selectedProducts[key] = {};
      state.preSelect.forEach((product, index) => {
        state.selectedProducts[key][`product${index}`] = product;
      });
      state.preSelect = [];
      setStorage(state);
      return { ...state };
    }

    case ordersActionTypes.REMOVE_PRODUCT: {
      const product = Object.keys(state.selectedProducts).find(
        name => name.slice(0, 4) + action.payload.id === name
      );
      if (product) {
        delete state.selectedProducts[product];
      }
      setStorage(state);
      return { ...state };
    }

    case ordersActionTypes.PRE_ADD_PRODUCT: {
      if (action.payload.productData) {
        state.preSelect.push(action.payload.productData);
      }
      return { ...state };
    }

    case ordersActionTypes.PRE_REMOVE_PRODUCT: {
      const productToDelete = state.preSelect.find(
        product => product.id === action.payload.id
      );
      productToDelete &&
        state.preSelect.splice(state.preSelect.indexOf(productToDelete), 1);
      return { ...state };
    }

    case ordersActionTypes.PRE_REPLACE_PRODUCT: {
      const newData = action.payload.productData;
      if (newData) {
        state.preSelect[action.payload.id] = newData;
      }
      return { ...state };
    }

    case ordersActionTypes.CLEAR_PRESELECT: {
      state.preSelect = [];
      return { ...state };
    }

    default:
      return state;
  }
};
export default orderReducer;
