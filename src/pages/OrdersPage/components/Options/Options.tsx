import React, { useContext } from "react";
import Styles from "./style/Options.module.scss";
import { OrdersContext } from "../Orders/Orders";

const Options = () => {
  // const ordersContext = useContext(OrdersContext);
  return (
    <div className={Styles.main}>
      <p>Share</p>
      <p>Delete</p>
    </div>
  );
};
export default Options;
