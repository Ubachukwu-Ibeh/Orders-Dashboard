import React, { useContext } from "react";
import * as orderActionTypes from "../../../../actionTypes/orderActionTypes";
import Styles from "./style/Options.module.scss";
import { useDispatch } from "react-redux";
import { OrderContext } from "../Orders/Orders";

const Options = ({ id }: { id: number }) => {
  const dispatch = useDispatch();
  const setResetOrdersList = useContext(OrderContext);

  const deleteItem = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: orderActionTypes.REMOVE_PRODUCT,
      payload: {
        id
      }
    });
    setResetOrdersList && setResetOrdersList(prev => !prev);
  };

  return (
    <div className={Styles.main}>
      <p>Share</p>
      <p onClick={e => deleteItem(e)}>Delete</p>
    </div>
  );
};
export default Options;
