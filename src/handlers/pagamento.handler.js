var paypal = require("paypal-rest-sdk");
var boom = require("@hapi/boom");

paypal.configure({
  mode: "sandbox",
  client_id:
    "Ae4nQrbcDcV618ZY3tNESb89p_VcmxcsqJydtXIESkLUq9ZQEzGyNi28wIEUgURFRbl-UNDCANbZ4xTv",
  client_secret:
    "EG1l_OnP_zBdba8ruYEMj2bmtYKMAIdqAq6c8aIpXKS8wZzqQt18r1WQlRDs2f8ZBwy75VPpANLFiVr-",
});

const pagar = async (req, h) => {
  var json_pagamento = {
    intent: "sale",
    redirect_urls: {
      return_url: "http://localhost:3000/buySuccess",
      cancel_url: "http://localhost:3000/",
    },
    payer: { payment_method: "paypal" },
    transactions: [
      {
        item_list: { items: req.payload.items },
        amount: {
          total: req.payload.amount.total.toFixed(2),
          currency: req.payload.amount.currency,
        },
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(JSON.stringify(json_pagamento), (err, pagamento) => {
      if (err) {
        console.warn(err);
        reject(new Error(err));
      } else {
        pagamento.links.forEach((link) => {
          if (link.rel === "approval_url") {
            resolve(link.href);
          }
        });
      }
    });
  }).then((resolve) => resolve);
};

module.exports = {
  pagar,
};
