const Joi = require("@hapi/joi");

module.exports = {
  name: Joi.string().min(3).required(),
  dateOfBirth: Joi.date().iso(),
  docType: Joi.string(),
  docNumber: Joi.string().min(3),
  email: Joi.string().email().required(),
  status: Joi.string(),
  password: Joi.string().min(6).required(),
  address: [
    {
      street: Joi.string(),
      complement: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      zipcode: Joi.string(),
      number: Joi.string(),
    },
  ],
  timestamps: Joi.any().forbidden(),
};
