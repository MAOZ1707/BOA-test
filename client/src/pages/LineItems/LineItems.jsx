import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLineItems } from "../../services/axios";
import { useHistory } from "react-router";

import "./Style/LineItems.css";

const LineItems = () => {
  const orderNumber = useParams().id;
  const [lineItems, setLineItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (orderNumber) {
      getLineItems(orderNumber).then((data) => setLineItems(data.line_items));
    }
  }, [orderNumber]);

  return (
    <div className="line-items_container">
      <h3 className="line-items_title">Line items</h3>
      <h5 className="line-items_sub-title">Order Number: {orderNumber}</h5>
      <ul className="line-items_list-wrapper">
        {lineItems &&
          lineItems.map((item) => {
            return (
              <li key={item._id} className="line-items_list-item">
                <h4>{item.title} </h4>
                <div>
                  <span>Price:</span> {item.price}$
                </div>
              </li>
            );
          })}
      </ul>
      <button onClick={() => history.goBack()}>
        <i class="fas fa-arrow-left"></i> <span>Back</span>
      </button>
    </div>
  );
};

export default LineItems;
