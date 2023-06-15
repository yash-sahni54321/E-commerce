import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search";
import LoginsignUp from "./component/User/LoginSignUp.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

import UserOptions from "./component/layout/Header/UserOptions.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>
        <div className="App">
          <Header />
          {isAuthenticated && <UserOptions user={user} />}
          <div className="content">
            <div>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/product/:id">
                <ProductDetails />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/Search">
                <Search />
              </Route>
              <Route exact path="/login">
                <LoginSignUp />
              </Route>
              <Route path="/products/:keyword">
                <Products />
              </Route>
            </div>
          </div>
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
