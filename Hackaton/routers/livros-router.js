//arquivo para ser índice das rotas

var express = require("express");
const router = express.Router();

const livrosController = require("../controllers/livros-controller");

router.get("/", livrosController.index);
router.get("/livros", livrosController.livros);
router.get("/livros/cadastrarLivro", livrosController.cadastrarLivro_get);
router.post("/livros", livrosController.cadastrarLivro_post);
router.get("/livros/editarCadastroLivro/:id", livrosController.editarCadastroLivro_get);
router.post("/livros/editarCadastroLivro", livrosController.editarCadastroLivro_post);
router.get("/livros/deletarLivro/:id", livrosController.deletarLivro);
router.get("/livros/fichaLivro/:id", livrosController.fichaLivro);
router.get("/resultadosPesquisa", livrosController.resultadosPesquisa);




module.exports = router;