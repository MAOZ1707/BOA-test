const router = require("express").Router();
const orderController = require("../controller/ordersController");

router.route("/").get(orderController.getAllOrders);
router.route("/save").get(orderController.getAllDataAndSave);
router.route("/line-items/:order_number").get(orderController.getLineItemsByOrderNumber);

module.exports = router;
