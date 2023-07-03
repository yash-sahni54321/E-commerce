import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrders.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ConfirmOrders = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const Subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const proceedToPayment = () => {
    const data = {
      Subtotal,
      tax,
      totalPrice,
      shippingCharges,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  const shippingCharges = Subtotal > 1000 ? 0 : 200;
  const tax = Subtotal * 0.18;
  const totalPrice = Subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode},${shippingInfo.country}`;
  return (
    <Fragment>
      <MetaData title="Confirm Orders" />
      <CheckoutSteps activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* {..} */}
        <div className="orderSummary">
          <Typography>Order Summery</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>₹{Subtotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>₹{shippingCharges}</span>
            </div>
            <div>
              <p>GST:</p>
              <span>₹{tax}</span>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>₹{totalPrice}</span>
          </div>

          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrders;
