import { ISelectedProducts } from "../interfaces/interfaces";
import { getStorage } from "../utils/localStorage";
const storage = getStorage();

const selectedProducts: ISelectedProducts = {
  preSelect: [],
  selectedProducts: {},
  dispatch: () => {},
  ...storage
};
export default selectedProducts;
