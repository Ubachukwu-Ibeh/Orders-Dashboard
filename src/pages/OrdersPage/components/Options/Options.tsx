import React, { useContext } from "react";
import * as actions from "../../../../actions/Orders_actions";
import Styles from "./style/Options.module.scss";
import { IItemProps } from "../../../../interfaces/interfaces";
import { OrdersContext } from "../Orders/Orders";

const Options: React.FC<IItemProps> = ({ id }) => {
  const ordersContext = useContext(OrdersContext);
  const deleteItem = () => {
    ordersContext.dispatch({
      type: actions.REMOVE_PRODUCT,
      payload: {
        id: id
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
