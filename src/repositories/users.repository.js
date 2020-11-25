const Cache = require("./cache.repository");
const UserModel = require("../models/users.model");
const Address = require("../models/users.model");
const { ERR_DUPLICATED_EMAIL } = require("../utils/errorTypes");
const { LOGIN_EXPIRATION_TIME, PREFIX_CACHE } = require("../auth/confs.auth");

const create = async (userData) => {
  const userExists = await UserModel.exists({ email: userData.email });

  if (userExists) {
    throw new Error(ERR_DUPLICATED_EMAIL);
  }

  const userModel = new UserModel(userData);
  return userModel.save();
};

const createAddress = async function (email, endereco) {
  const addressExists = await UserModel.exists({ street: endereco.street });

  if (addressExists) {
    throw new Error("Erro Endereco");
  }

  const addressModel = new Address(endereco);

  addressModel.save();

  UserModel.findOne({ email }).then(function (record) {
    record.address.push({
      street: endereco.street,
      complement: endereco.complement,
      state: endereco.state,
      country: endereco.country,
      zipcode: endereco.zipcode,
      number: endereco.number,
    });
    record.save();
  });
};

const findByEmail = (email) => UserModel.findOne({ email });

const setCache = (user) =>
  Cache.set(
    `${PREFIX_CACHE}${user.id}`,
    JSON.stringify(user),
    LOGIN_EXPIRATION_TIME
  );

const removeCache = (userId) => Cache.del(`${PREFIX_CACHE}${userId}`);

module.exports = {
  create,
  findByEmail,
  setCache,
  removeCache,
  createAddress,
};
