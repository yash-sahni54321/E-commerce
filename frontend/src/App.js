import "./App.css";
import Header from "./component/layout/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Navigate,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ResetPassword from "./component/User/UpdatePassword.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrders from "./component/Cart/ConfirmOrders.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList.js";
import { Elements } from "@stripe/react-stripe-js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import { loadStripe } from "@stripe/stripe-js";
import PageNotFound from "./component/layout/PageNotFound.js";
import axios from "axios";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UserList from "./component/admin/UserList.js";
import UserUpdate from "./component/admin/UserUpdate.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user || {});

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
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
              <Route path="/cart">
                <Cart />
              </Route>
              <ProtectedRoute exact path="/account">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute exact path="/me/update">
                <UpdateProfile />
              </ProtectedRoute>
              <ProtectedRoute exact path="/password/update">
                <UpdatePassword />
              </ProtectedRoute>
              <ProtectedRoute exact path="/shipping">
                <Shipping />
              </ProtectedRoute>
              <ProtectedRoute exact path="/orders/confirm">
                <ConfirmOrders />
              </ProtectedRoute>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute exact path="/process/payment">
                    <Payment />
                  </ProtectedRoute>
                </Elements>
              )}
              <ProtectedRoute exact path="/success">
                <OrderSuccess />
              </ProtectedRoute>
              <ProtectedRoute exact path="/orders">
                <MyOrders />
              </ProtectedRoute>
              <ProtectedRoute exact path="/order/:id">
                <OrderDetails />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/dashboard">
                <Dashboard />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/products">
                <ProductList />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/product">
                <NewProduct />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/product/:id">
                <UpdateProduct />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/orders">
                <OrderList />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/order/:id">
                <ProcessOrder />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/users">
                <UserList />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/user/:id">
                <UserUpdate />
              </ProtectedRoute>
              <ProtectedRoute exact path="/admin/reviews">
                <ProductReviews />
              </ProtectedRoute>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/404">
                <PageNotFound />
              </Route>
              <Route path="*">
                <Link to="/"></Link>
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
