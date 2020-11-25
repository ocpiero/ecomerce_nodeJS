/* para criar uma secretkey forte. Configurando e rodando local
- (colar no terminal): node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
- guarde SECRET_KEY no arquivo .env
*/
const { ERR_INVALID_TOKEN } = require('../utils/errorTypes');
const { ALGORITHM } = require('./confs.auth');


const JWT = require('jsonwebtoken');


const generate = data => (
  new Promise( resolve => {
    JWT.sign(data, process.env.SECRET_KEY, { algorithm: ALGORITHM }, function(err, token) {
  	  if(err) {
  		throw new Error(ERR_INVALID_TOKEN);
  	  }

  	  resolve(token);
    });
  })
);

module.exports = {
  generate,
};
