const loginHandler = require("../handlers/login.handler");
const logoutHandler = require("../handlers/logout.handler");
const loginSchema = require("../schemas/login.schema");

module.exports = [
  {
    method: "POST",
    path: "/login",
    options: {
      auth: false,
      security: true,
      cors: {
        origin: ["http://localhost:3000", "http://localhost"],
        additionalHeaders: [
          "Access-Control-Allow-Origin",
          "Access-Control-Request-Method",
          "Allow-Origin",
          "Origin",
          "access-control-allow-origin",
          "access-control-request-method",
          "allow-origin",
          "origin",
        ],
      },
      handler: loginHandler.login,
      /*validate: {
      	payload: loginSchema
      }*/
    },
  },
  {
    method: "POST",
    path: "/logout",
    options: {
      security: true,
      cors: {
        origin: ["http://localhost:3000", "http://localhost"],
        additionalHeaders: [
          "Access-Control-Allow-Origin",
          "Access-Control-Request-Method",
          "Allow-Origin",
          "Origin",
          "access-control-allow-origin",
          "access-control-request-method",
          "allow-origin",
          "origin",
        ],
      },
    },
    handler: logoutHandler.logout,
  },
];
