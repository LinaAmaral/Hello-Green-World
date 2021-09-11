var mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://rebeca_palmeira:rebeca_palmeira@cluster0.9jadt.mongodb.net/biblioteca?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const Estudante = mongoose.model("estudantes", {//variável Livro está configurando a modelagem dos documentos que serão cadastrados/instanciados futuramente
    nome: String,
    sobrenome: String,
    dataNascimento: String,
    email: String,
    escola: String,
    telefone: String
});

module.exports = Estudante;