var express = require("express");
const router = express.Router();

const cooperativaController = require("../controllers/cooperativa-controller");

// router.get("/", estudanteController.index);
// router.get("/estudantes", livrosController.livros);
router.get("/cadastrarCooperativa", cooperativaController.cadastrarCooperativa_get);
router.post("/cadastrarCooperativa", cooperativaController.cadastrarCooperativa_post);
// router.get("/livros/editarCadastroLivro/:id", livrosController.editarCadastroLivro_get);
// router.post("/livros/editarCadastroLivro", livrosController.editarCadastroLivro_post);
// router.get("/livros/deletarLivro/:id", livrosController.deletarLivro);
// router.get("/livros/fichaLivro/:id", livrosController.fichaLivro);
// router.get("/resultadosPesquisa", livrosController.resultadosPesquisa);




module.exports = router;