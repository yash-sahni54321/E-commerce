const Order = require("../models/orderModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler");

// Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Upadate Order status -- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }
  if (order.orderStatus === "Delivered") {
    next(new ErrorHandler("You have already Delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not Found", 404));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});
