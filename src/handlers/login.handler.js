const boom = require("@hapi/boom");
const authenticate = require("../auth/authenticate.auth");
const userRepository = require("../repositories/users.repository");

const {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
  ERR_INVALID_TOKEN,
} = require("../utils/errorTypes");

const login = async (req, h) => {
  const { email, password } = req.payload;

  try {
    const { user, token } = await authenticate.login(email, password);

    console.log(user);
    await userRepository.setCache(user);

    return h
      .response({
        token: token,
        user: {
          name: user.name,
          email: user.email,
        },
      })
      .code(200);
  } catch (e) {
    switch (e.message) {
      case ERR_USER_NOT_FOUND:
        throw boom.notFound("Usuário não encontado!");
      case ERR_INVALID_PASSWORD:
        throw boom.badData("Senha invalida para o e-mail cadastrado!");
      case ERR_INVALID_TOKEN:
        throw boom.badImplementation("Erro ao gerar o token!");
      default:
        throw boom.badImplementation(e);
    }
  }
};

module.exports = {
  login,
};
