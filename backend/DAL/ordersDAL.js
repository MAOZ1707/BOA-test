const axios = require("axios");

exports.getOrdersData = () => {
  return axios.get(`${process.env.SHOPIFY_DOMAIN}/admin/api/2021-07/orders.json?`, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.SHOPIFY_PASSWORD,
    },
  });
};
