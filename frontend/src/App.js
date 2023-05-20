import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Switch>
        <div className="App">
          <Header />
          <div className="content">
            <div>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/product/:id">
                <ProductDetails />
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
