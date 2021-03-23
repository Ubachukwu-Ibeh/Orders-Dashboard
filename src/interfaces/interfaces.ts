export interface IProductData {
  color: string;
  product_id: number;
  name: string;
  price: number;
  discount: number;
  hasBeenSelected: boolean;
  quantity: number;
  total: number;
  id: number;
}

interface IOrderActionPayload {
  productData?: IProductData;
  id: number;
}

export interface IOrderAction {
  type: string;
  payload: IOrderActionPayload;
}

export interface IItem {
  [name: string]: IProductData;
}

interface ISelected {
  [name: string]: IItem;
}

export interface ISelectedProducts {
  preSelect: Array<IProductData>;
  selectedProducts: ISelected;
}

export interface IProductTableProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IItemDisplay {
  order_id?: number;
  time?: number;
  rating?: string;
  total?: number;
  profit?: string;
  name?: string;
  shipping?: number;
  discount?: number;
  grandTotal?: string;
  profitPercentage?: number;
}

export interface IStore {
  orderReducer: ISelectedProducts;
}
