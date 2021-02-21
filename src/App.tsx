import React from "react";
import Orders from "./pages/OrdersPage/components/Orders/Orders";
import Styles from "./App.module.scss";

const App = () => {
  return (
    <div className={Styles.main}>
      <Orders />
    </div>
  );
};
export default App;
