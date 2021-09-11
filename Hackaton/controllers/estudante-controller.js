const Estudante = require("../models/estudante-model");//vai chamar minha modelagem

exports.index = (req, res) => {
    res.render("./views/pages/index");
}

exports.cadastrarEstudante_get = (req, res) => {
    res.render("./views/pages/cadastrarEstudante");
}

exports.cadastrarEstudante_post = (req, res) => {
    let estudante = new Estudante();
    
    estudante.nome = req.body.nome;//livro.tituloLivro chama a modelagem e body.tituloLivro puxa o valor do formulário de cadastro
    estudante.sobrenome = req.body.sobrenome;
    estudante.dataNascimento = req.body.dataNascimento;
    estudante.email = req.body.email;
    estudante.escola = req.body.escola;
    estudante.telefone = req.body.telefone;
    //depois vai salvar o livro no BD
    estudante.save((err) => {
        if(err) {
            return res.status(500).send("Erro ao cadastrar livro.");
        }

        // por fim, vai redirecionar para a página que lista livros cadastrados
        return res.send("estudante");
    });
};