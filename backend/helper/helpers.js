const moment = require("moment");

exports.shapeName = (first, last) => {
  return `${first.trim()} ${last.trim()}`;
};

exports.getTotalPrice = (line_items) => {
  let sum = 0;

  line_items.forEach((order) => {
    sum += Number(order.price);
  });

  return sum;
};

exports.shapeDate = (date) => {
  return moment(date).format("DD/MM/YY");
};
