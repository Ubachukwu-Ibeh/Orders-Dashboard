import React, { useState } from "react";
import Styles from "./style/Orders.module.scss";
import ProductTable from "../ProductTable/ProductTable";
import Item from "../Item/Item";
import { getStorage } from "../../../../utils/localStorage";

// const OrderContext = React.createContext()
const Order = () => {
  let [isOpen, setIsOpen] = useState(false);
  const storage = getStorage();
  const props = {
    setIsOpen
  };

  const openOrdersList = () => {
    setIsOpen(!isOpen);
  };

  return (
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
      <table cellSpacing="0" cellPadding="0" className={Styles.itemTable}>
        <tbody>
          {Object.keys(storage ? storage.selectedProducts : []).map(
            (item, index) => {
              const props = {
                id: Number(item.slice(4))
              };
              return <Item key={index} {...props} />;
            }
          )}
        </tbody>
      </table>
      {isOpen && <ProductTable {...props} />}
    </div>
  );
};
export default Order;
