const { getOrdersData } = require("../DAL/ordersDAL");
const { shapeName, getTotalPrice, shapeDate } = require("../helper/helpers");
const Orders = require("../model/orderModel");
const LineItems = require("../model/lineItemsModel");

exports.getAllDataAndSave = async (req, res, next) => {
  // check if there is data in database
  const checkOrders = await Orders.find({});

  if (checkOrders && checkOrders.length > 0) {
    return res.status(200).json({ success: true, message: "have data" });
  } else {
    // if empty get data and save
    const response = await getOrdersData();
    const orders = response.data.orders;

    try {
      let fetchAll = [];

      orders.forEach(async (order) => {
        const dataOrder = Orders.create({
          orderNumber: order.order_number,
          fullName: shapeName(order.customer["first_name"], order.customer["last_name"]),
          orderDate: shapeDate(order.created_at),
          summaryAmount: getTotalPrice(order.line_items),
        });
        const dataLinerItems = await LineItems.create({
          orderNumber: order.order_number,
          line_items: order.line_items.map((line_item) => {
            return {
              price: line_item.price,
              title: line_item.name,
            };
          }),
        });

        fetchAll.push(dataOrder);
        fetchAll.push(dataLinerItems);
      });

      Promise.all(fetchAll);

      res.status(200).json({ success: true, message: "Success" });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find({});
    if (!orders || orders.length === 0) {
      res.status(401).json({ success: false, message: "Could not find orders" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getLineItemsByOrderNumber = async (req, res, next) => {
  const order_number = req.params.order_number;

  try {
    const line_items = await LineItems.findOne({ orderNumber: order_number });
    res.status(200).json({ success: true, data: line_items });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
