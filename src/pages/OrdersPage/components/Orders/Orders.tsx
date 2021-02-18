import React, { useState, useReducer, useContext } from "react";
import Styles from "./style/Orders.module.scss";
import { selectedProducts } from "../../../../stores/SelectedProducts_store";
import ProductTable from "../ProductTable/ProductTable";
import orderReducer from "../../../../reducers/Orders_reducer";
import Item from "../Item/Item";
import { getItem } from "../../../../utils/localStorage";

export const OrdersContext = React.createContext(selectedProducts);

const Order = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [state, dispatch] = useReducer(orderReducer, selectedProducts);
  const ordersContext = useContext(OrdersContext);
  const props = {
    setIsOpen: setIsOpen
  };
  const openOrdersList = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={Styles.main}>
      <div>
        <button onClick={() => openOrdersList()}>+ New order</button>
      </div>
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          <tr>
            <th>#</th>
            <th>Order id</th>
            <th>Created</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Profit</th>
            <th>Status</th>
          </tr>
          {Object.keys(ordersContext.selectedProducts).map((item, index) => {
            const props = {
              id: index
            };
            return <Item key={index} {...props} />;
          })}
        </tbody>
      </table>
      <OrdersContext.Provider value={{ ...state, dispatch: dispatch }}>
        {isOpen ? <ProductTable {...props} /> : <></>}
      </OrdersContext.Provider>
    </div>
  );
};
export default Order;
