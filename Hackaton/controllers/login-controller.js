const Estudante = require("../models/estudante-model");
const Cooperativa = require("../models/cooperativa-model");
const Escola = require("../models/escola-model");

exports.login_get = (req, res) => {
    res.render("./views/pages/login");
}




exports.login_post = (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    Estudante.findOne({ $and: [{ email: email }, { senha: senha }] }, (err, usuario) => {
        if (err)
            return res.status(500).send("Erro ao conectar no banco de dados");
        if (usuario.length != 0)
            return res.send("área do estudante")
    })
    Cooperativa.findOne({ $and: [{ email: email }, { senha: senha }] }, (err, usuario) => {
        var usuario_id = usuario._id
         console.log(usuario_id)
        if (err)
            return res.status(500).send("Erro ao conectar no banco de dados");
        if (usuario.length != 0)
            return res.send("área da cooperativa")
    })
    Escola.findOne({ $and: [{ email: email }, { senha: senha }] }, (err, usuario) => {
        if (err)
            return res.status(500).send("Erro ao conectar no banco de dados");
        if (usuario.length != 0)
            return res.send("área da escola")
        else
            res.send("usuário não cadastrado");
    })
}

