var express = require("express");
var mongoose = require("mongoose");

const app = express();

const port = 5006;
app.listen(port, () => {
    console.log(`Servidor inicializado na porta ${port}`);
});

mongoose.connect("mongodb+srv://rebeca_palmeira:rebeca_palmeira@cluster0.9jadt.mongodb.net/biblioteca?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");
app.set("views", __dirname, "/views");

app.use(express.urlencoded({ extended: true }));//permitindo fluxo entre páginas
app.use(express.json());// fluxo de informações vai ser no formato json
app.use(express.static("public"));

app.get("/cadastrarLivro", (requisicao, resposta) => {
    resposta.render("cadastrarLivro");
})


// Uma bibliotecária entrou em contato conosco e pediu que os alunos da turma BCW5 desenvolvessem um sistema para sua biblioteca. Neste sistema, ela gostaria de cadastrar os livros, listar os livros existentes, editar e excluir. Ela salientou que a pessoa que irá operar o sistema, é muito desatenta e "não tem muita intimidade com o computador", então seria importante fazermos a validação dos dados antes de inserir no banco de dados.
// Então, vamos desenvolver o que a cliente pede atentando-se para a estilização da página também !

// Desafio:
// * Criar um botão de pesquisa funcional;

//modelando o BD usando Mongoose

const Livro = mongoose.model("livros", {//variável Livro está configurando a modelagem dos documentos que serão cadastrados/instanciados futuramente
    tituloLivro: String,
    numeroPaginas: Number,
    nomeAutor: String,
    isbn: Number,//10 a 13 dígitos
    edicao: String,
    editora: String,
    genero: String,
    dataPublicacao: String
});

// configura rotas get(para quando chegar uma chamada apontando para aquela rota) e post (para quando chegar uma requisição para salvar algo no BD)
app.get("/", (requisicao, resposta) => {
    resposta.render("index");
})

app.get("/cadastrarLivro", (requisicao, resposta) => {//get apontando para rota /cadastrarLivro
    resposta.render("cadastrarLivro");//renderiza página ejs cadastrarLivro (página de formulário de contato)
});

app.get("/livrosCadastrados", (requisicao, resposta) => {//quando a rota apontar para a página acervo, o motor de visualização ejs vai renderizar a página acervo.ejs
    let consulta = Livro.find({}, (err, livro) => {//livrosCadastrados vai ser o array percorrido no acervo.ejs
        // console.log(consulta);
        if (err)
            return resposta.status(500).send("Erro ao consultar livros");
        resposta.render("livrosCadastrados", {livrosCadastrados:livro});
    })
})

app.post("/cadastrarLivro", (requisicao, resposta) => {//quando o express receber uma requisição de POST do formulário, vai salvar o livro no BD
    //primeiro, vai instanciar o produto com base no modelo mongoose.model()
    let livro = new Livro();
    livro.tituloLivro = requisicao.body.tituloLivro;
    livro.numeroPaginas = requisicao.body.numeroPaginas;
    livro.nomeAutor = requisicao.body.nomeAutor;
    livro.isbn = requisicao.body.isbn;
    livro.edicao = requisicao.body.edicao;
    livro.editora = requisicao.body.editora;
    livro.genero = requisicao.body.genero;       
    livro.dataPublicacao = requisicao.body.dataPublicacao;

    //depois vai salvar o livro no BD
    livro.save((err) => {
        if(err) {
            return resposta.status(500).send("Erro ao cadastrar livro.");
        }

        // por fim, vai redirecionar para a página que lista livros cadastrados
        return resposta.redirect("/livrosCadastrados");
    });
});

app.get("/deletarLivro/:id", (requisicao, resposta) => {
    let chave = requisicao.params.id;

    Livro.deleteOne({_id:chave}, (err, result) => {
        if(err)
            return resposta.status(500).send("Erro ao excluir registro de livro.");

        resposta.redirect("/livrosCadastrados");
    })    
});

app.get("/editarCadastroLivro/:id", (requisicao, resposta)=>{
	Livro.findById(requisicao.params.id, (err, livro)=>{
		if(err)
			return resposta.status(500).send("Erro ao consultar produto");
		resposta.render("editarCadastroLivro",{livrosCadastrados:livro})
	});
});


app.post("/editarCadastroLivro", (requisicao, resposta)=>{
	var id = requisicao.body.id;
	Livro.findById(id,(err, livro)=>{
		if(err) {
            return resposta.status(500).send("Erro ao salvar edição do cadastro do livro.");
        }
			
		livro.tituloLivro = requisicao.body.tituloLivro;
        livro.numeroPaginas = requisicao.body.numeroPaginas;
        livro.nomeAutor = requisicao.body.nomeAutor;
        livro.isbn = requisicao.body.isbn;
        livro.edicao = requisicao.body.edicao;
        livro.editora = requisicao.body.editora;
        livro.genero = requisicao.body.genero;           
        livro.dataPublicacao = requisicao.body.dataPublicacao;

		livro.save(err =>{
			if(err)
				return resposta.status(500).send("Erro ao editar cadastro do livro.");
			return resposta.redirect("/livrosCadastrados");			
		});
	});
});

app.get("/resultadosPesquisa", (requisicao, resposta) => {
    var termoPesquisado = requisicao.query.busca;
    //{tituloLivro: termoPesquisado}
    // {tituloLivro: {$eq: termoPesquisado}}
    let consulta = Livro.find(
        { $or: [
        {tituloLivro: {$regex: new RegExp('.*' + termoPesquisado + '.*', 'i')}},
        {nomeAutor: {$regex: new RegExp('.*' + termoPesquisado + '.*', 'i')}},
        {editora: {$regex: new RegExp('.*' + termoPesquisado + '.*', 'i')}},
        {genero: {$regex: new RegExp('.*' + termoPesquisado + '.*', 'i')}},
        // {isbn: termoPesquisado}
    ]}
        , (err, livro) => {
        if (err) {
            return resposta.status(500).send("Erro ao fazer a busca, erro interno do servidor.");
        }

        resposta.render("resultadosPesquisa", {livrosCadastrados:livro});//livrosCadastrados faz referência forEach da página EJS onde quero msotrar os resultados, nesse caso, a pa´gina resultadosPesquisa

    });
}); 

app.get("/fichaLivro/:id", (requisicao, resposta) => {
    Livro.findById(requisicao.params.id, (err, livro) => {
		if(err)
			return resposta.status(500).send("Erro ao carregar a ficha do livro.");
        resposta.render("fichaLivro", {livrosCadastrados:livro});
	});   
})

