import { ISelectedProducts, IOrderAction } from "../interfaces/interfaces";
import { setStorage } from "../utils/localStorage";
import * as actionTypes from "../actionTypes/Orders_actionTypes";

const orderReducer = (state: ISelectedProducts, action: IOrderAction) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT: {
      const key = `item${action.payload.id}`;
      state.selectedProducts[key] = {};
      state.preSelect.forEach((product, index) => {
        state.selectedProducts[key][`product${index}`] = product;
      });
      state.preSelect = [];
      setStorage(state);
      return { ...state };
    }

    case actionTypes.REMOVE_PRODUCT: {
      const product = Object.keys(state.selectedProducts).find(
        name => name.slice(0, 4) + action.payload.id === name
      );
      if (product) {
        delete state.selectedProducts[product];
      }
      setStorage(state);
      return { ...state };
    }

    case actionTypes.PRE_ADD_PRODUCT: {
      if (action.payload.productData) {
        state.preSelect.push(action.payload.productData);
      }
      return { ...state };
    }

    case actionTypes.PRE_REMOVE_PRODUCT: {
      const productToDelete = state.preSelect.find(
        product => product.id === action.payload.id
      );
      productToDelete &&
        state.preSelect.splice(state.preSelect.indexOf(productToDelete), 1);
      return { ...state };
    }

    case actionTypes.PRE_REPLACE_PRODUCT: {
      const newData = action.payload.productData;
      if (newData) {
        state.preSelect[action.payload.id] = newData;
      }
      return { ...state };
    }

    default:
      return state;
  }
};
export default orderReducer;
