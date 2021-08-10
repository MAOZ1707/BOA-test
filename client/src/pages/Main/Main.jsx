import React from "react";
import Table from "../../components/Table/Table";

import "./Style/Main.css";

const Main = ({ orders }) => {
  return (
    <div className="main_container">
      <h1 className="main_title">Orders</h1>
      {orders.length > 0 && <Table orders={orders} />}
    </div>
  );
};

export default Main;
