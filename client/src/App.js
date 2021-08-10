import { saveDataToDB, getAllOrders } from "./services/axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import Main from "./pages/Main/Main";
import LineItems from "./pages/LineItems/LineItems";

import "./App.css";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    saveDataToDB();
    getAllOrders().then((data) => setOrders(data));
  }, []);

  let routes = (
    <Switch>
      <Route exact path="/">
        <Main orders={orders} />
      </Route>
      <Route exact path="/line-item/:id">
        <LineItems />
      </Route>
      <Redirect exact to="/" />
    </Switch>
  );

  return (
    <Router>
      <>{routes}</>
    </Router>
  );
}

export default App;
