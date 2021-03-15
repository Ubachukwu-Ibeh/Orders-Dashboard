import React from "react";
import * as orderActionTypes from "../../../../actionTypes/orderActionTypes";
import Styles from "./style/Options.module.scss";
import { IItemProps } from "../../../../interfaces/interfaces";
import { useDispatch } from "react-redux";

const Options = ({ id }: IItemProps) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch({
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
