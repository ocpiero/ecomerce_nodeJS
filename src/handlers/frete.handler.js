const frete = require("frete");

function freteCalculoSimplesPrazo() {
  frete()
    .cepOrigem("13467460")
    .servico(frete.servicos.sedex)
    .prazo("13466321", function (err, results) {
      console.log(err);
      console.log(results);
    });
}

function freteSimplesDePreco() {
  frete()
    .cepOrigem("13467460")
    .peso(1)
    .formato(frete.formatos.caixaPacote)
    .comprimento(16)
    .altura(2)
    .largura(11)
    .diametro(1)
    .maoPropria(frete.maoPropria.nao)
    .valorDeclarado(50)
    .avisoRecebimento(frete.avisoRecebimento.sim)
    .servico(frete.servicos.sedex)
    .preco("13466321", function (err, results) {
      console.log(err);
      console.log(results);
    });
}

function freteSimplesPrecoPrazo(params) {
  frete()
    .cepOrigem("13467460")
    .peso(1)
    .formato(frete.formatos.caixaPacote)
    .comprimento(16)
    .altura(2)
    .largura(11)
    .diametro(1)
    .maoPropria(frete.maoPropria.nao)
    .valorDeclarado(50)
    .avisoRecebimento(frete.avisoRecebimento.sim)
    .servico(frete.servicos.sedex)
    .precoPrazo("13466321", function (err, results) {
      console.log(err);
      console.log(results);
    });
}

function freteMoreUsage() {
  frete
    .cepOrigem("13467460")
    .servico([frete.servicos.sedex, frete.servicos.pac]);

  frete({
    cepDestino: "13466321",
    peso: 1,
    formato: frete.formatos.caixaPacote,
    comprimento: 16,
    altura: 2,
    largura: 11,
    diametro: 1,
    maoPropria: frete.maoPropria.nao,
    valorDeclarado: 50,
    avisoRecebimento: frete.avisoRecebimento.sim,
  }).prazo(function (err, result) {
    console.log(err);
    console.log(result);
  });
}

module.exports = {
  freteMoreUsage,
  freteCalculoSimplesPrazo,
  freteSimplesDePreco,
  freteSimplesPrecoPrazo,
};
