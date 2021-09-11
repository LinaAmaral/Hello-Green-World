var mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://rebeca_palmeira:rebeca_palmeira@cluster0.9jadt.mongodb.net/biblioteca?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const Escola = mongoose.model("escolas", {//variável Livro está configurando a modelagem dos documentos que serão cadastrados/instanciados futuramente
    nome: String,
    cnpj: String,
    email: String,
    senha: String,
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    cep: String,
    estado: String,
    telefone: String,
    contato: String,
    tipo: String,
    tipo_usuario: String,
    sacolaPlastico: Number,
    sacolaMetal: Number,   
    sacolaVidro: Number
});

module.exports = Escola;