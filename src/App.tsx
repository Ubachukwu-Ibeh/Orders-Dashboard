import React from "react";
import ProductTable from "./pages/OrdersPage/components/ProductTable/ProductTable";
import Orders from "./pages/OrdersPage/components/Orders/Orders";
import Styles from "./App.module.scss";

const App = () => {
  return (
    <div className={Styles.main}>
      <Orders />
      {/* <ProductTable /> */}
    </div>
  );
};
export default App;
