var express = require("express");
const router = express.Router();

const escolaController = require("../controllers/escola-controller");

// router.get("/", estudanteController.index);
// router.get("/estudantes", livrosController.livros);
router.get("/cadastrarEscola", escolaController.cadastrarEscola_get);
router.post("/cadastrarEscola", escolaController.cadastrarEscola_post);
router.get("/escola", escolaController.escola);
// router.get("/livros/editarCadastroLivro/:id", livrosController.editarCadastroLivro_get);
// router.post("/livros/editarCadastroLivro", livrosController.editarCadastroLivro_post);
// router.get("/livros/deletarLivro/:id", livrosController.deletarLivro);
// router.get("/livros/fichaLivro/:id", livrosController.fichaLivro);
// router.get("/resultadosPesquisa", livrosController.resultadosPesquisa);




module.exports = router;