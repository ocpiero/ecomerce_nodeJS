const Hapi = require("@hapi/hapi");
const produtos = require("../handlers/produtos.handler");
const pagamento = require("../handlers/pagamento.handler");
const frete = require("frete");

module.exports = [
  {
    method: "GET",
    path: "/produtos",
    options: {
      auth: false,
      cors: true,
    },
    handler(req, h) {
      return h
        .response(produtos.pegaTodosOsProdutos(req.query.pagina))
        .code(200);
    },
  },
  {
    method: "GET",
    path: "/produtos/{slug}",
    options: {
      auth: false,
      cors: true,
    },
    handler(req, h) {
      return h.response(produtos.pegaProduto(req.params.slug)).code(200);
    },
  },
  {
    method: "GET",
    path: "/categorias/{categoria}/produtos",
    options: {
      auth: false,
      cors: true,
    },
    handler(req, h) {
      return h
        .response(
          produtos.pegaProdutosPorCategoria(
            req.params.categoria,
            req.query.pagina
          )
        )
        .code(200);
    },
  },
  {
    method: "GET",
    path: "/categorias",
    options: {
      auth: false,
      cors: true,
    },
    handler(req, h) {
      return h.response(produtos.pegaCategorias()).code(200);
    },
  },
  {
    method: "POST",
    path: "/pagamentos",
    options: {
      auth: false,
      cors: true,
    },
    handler: pagamento.pagar,
  },
  {
    method: "GET",
    path: "/frete",
    handler() {
      frete()
        .cepOrigem("13467460")
        .peso(1)
        .formato(1)
        .comprimento(16)
        .altura(2)
        .largura(11)
        .diametro(1)
        .maoPropria("N")
        .valorDeclarado(50)
        .avisoRecebimento("S")
        .servico(frete.codigos.sedex)
        .preco("13466321", function (err, results) {
          console.log(err);
          console.log(results);
        });
    },
  },
];
