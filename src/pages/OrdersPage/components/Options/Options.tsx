import React, { useContext } from "react";
import * as orderActionTypes from "../../../../actionTypes/Orders_actionTypes";
import Styles from "./style/Options.module.scss";
import { IItemProps } from "../../../../interfaces/interfaces";
import { OrdersContext } from "../Orders/Orders";

const Options = ({ id }: IItemProps) => {
  const ordersContext = useContext(OrdersContext);

  const deleteItem = () => {
    ordersContext.dispatch({
      type: orderActionTypes.REMOVE_PRODUCT,
      payload: {
        id
      }
    });
  };

  return (
    <div className={Styles.main}>
      <p>Share</p>
      <p onClick={() => deleteItem()}>Delete</p>
    </div>
  );
};
export default Options;
