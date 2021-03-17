import React, { useState } from "react";
import Styles from "./style/Orders.module.scss";
import ProductTable from "../ProductTable/ProductTable";
import Item from "../Item/Item";
import { getStorage } from "../../../../utils/localStorage";

export const OrderContext = React.createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const Order = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [, setResetOrdersList] = useState(false);
  const storage = getStorage();
  const props = {
    setIsOpen
  };
  const openOrdersList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={Styles.ultMain}>
      <div className={Styles.menuBar}>
        {Array(5)
          .fill(0)
          .map((item, index) => (
            <div key={index}></div>
          ))}
      </div>
      <div className={Styles.main}>
        <div className={Styles.pageHeaderCont}>
          <div className={Styles.pageHeader}>
            <div>
              <h1>Orders</h1>
              <p>Status: All</p>
              <p>Time: Ascending</p>
              <input type="search" name="" id="" />
            </div>
            <p className={Styles.newOrder} onClick={() => openOrdersList()}>
              + New order
            </p>
          </div>
          <table cellSpacing="0" cellPadding="0" className={Styles.tableHeader}>
            <tbody>
              <tr>
                <th>#</th>
                <th>Order id</th>
                <th>Created</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Profit</th>
                <th>Status</th>
                <th></th>
              </tr>
            </tbody>
          </table>
        </div>
        <OrderContext.Provider value={setResetOrdersList}>
          <table cellSpacing="0" cellPadding="0" className={Styles.itemTable}>
            <tbody>
              {Object.keys(storage ? storage.selectedProducts : []).map(
                item => {
                  const id = Number(item.slice(4));
                  const props = {
                    id
                  };
                  return <Item key={id} {...props} />;
                }
              )}
            </tbody>
          </table>
          {isOpen && <ProductTable {...props} />}
        </OrderContext.Provider>
      </div>
    </div>
  );
};
export default Order;
