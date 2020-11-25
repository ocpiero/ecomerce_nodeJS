const userHandler = require("../handlers/users.handler");
const userSchema = require("../schemas/users.schema");

module.exports = [
  {
    method: "POST",
    path: "/users",
    handler: userHandler.create,
    options: {
      /*validate: {
          payload: userSchema
  	  },*/
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/users",
    options: {
      cors: true,
    },
    handler: userHandler.getAll,
  },
  {
    method: "POST",
    path: "/pepekao",
    options: {
      cors: true,
    },
    handler: userHandler.createAddress,
  },
];
