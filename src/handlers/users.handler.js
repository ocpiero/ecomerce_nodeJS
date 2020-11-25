const boom = require("@hapi/boom");
const hash = require("../utils/hash");
const userRepository = require("../repositories/users.repository");
const { getRedis } = require("../repositories/cache.repository");
const { ERR_DUPLICATED_EMAIL } = require("../utils/errorTypes");
const { PREFIX_CACHE } = require("../auth/confs.auth");

const create = async (req, h) => {
  try {
    const userData = req.payload;

    const passwordHash = await hash.make(userData.password, 10);

    userData.password = passwordHash;

    const user = await userRepository.create(userData);
    return h.response(user).code(201);
  } catch (e) {
    switch (e.message) {
      case ERR_DUPLICATED_EMAIL:
        throw boom.badData("E-mail duplicado!");
      default:
        throw boom.badImplementation(e);
    }
  }
};

const createAddress = async (req, h) => {
  try {
    const email = req.payload.email;

    const endereco = req.payload.address;

    await userRepository.createAddress(email, endereco);
    return h.response("Deuboa!").code(201);
  } catch (e) {
    switch (e.message) {
      case "Erro Endereço":
        console.log(e.message);
        throw boom.badData("Nao foi possivel cadastrar o endereço no usuario");
      default:
        throw boom.badImplementation(e);
    }
  }
};

const getAll = async (req, h) => {
  const { credentials } = req.auth;
  const usuario = JSON.parse(
    await getRedis(PREFIX_CACHE + credentials.data.user_id)
  );
  return h.response(usuario.address).code(200);
};

module.exports = {
  create,
  createAddress,
  getAll,
};
