const Livro = require("../models/livros-model");//vai chamar minha modelagem

exports.index = (req, res) => {
    res.render("./views/pages/index");
}

exports.livros = (req, res) => {
    let consulta = Livro.find({}, (err, livro) => {//livrosCadastrados vai ser o array percorrido no acervo.ejs
        // console.log(consulta);
        if (err)
            return res.status(500).send("Erro ao consultar livros");
        res.render("./views/pages/livros", {livrosCadastrados: livro}); //aqui, livrosCadastrados é o o conjunto de produtos encontrados no find(), que nesse caso são todos {}       
    });
}

exports.cadastrarLivro_get = (req, res) => {//get apontando para rota /cadastrarLivro
    res.render("./views/pages/cadastrarLivro");//renderiza página ejs cadastrarLivro (página de formulário de contato)
};

exports.cadastrarLivro_post = (req, res) => {
    let livro = new Livro();
    livro.tituloLivro = req.body.tituloLivro;//livro.tituloLivro chama a modelagem e body.tituloLivro puxa o valor do formulário de cadastro
    livro.numeroPaginas = req.body.numeroPaginas;
    livro.nomeAutor = req.body.nomeAutor;
    livro.isbn = req.body.isbn;
    livro.edicao = req.body.edicao;
    livro.editora = req.body.editora;
    livro.genero = req.body.genero;       
    livro.dataPublicacao = req.body.dataPublicacao;

    //depois vai salvar o livro no BD
    livro.save((err) => {
        if(err) {
            return res.status(500).send("Erro ao cadastrar livro.");
        }

        // por fim, vai redirecionar para a página que lista livros cadastrados
        return res.redirect("/livros");
    });
};

exports.resultadosPesquisa = (req, res) => {
    var termoPesquisado = req.query.busca;
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
            return res.status(500).send("Erro ao fazer a busca, erro interno do servidor.");
        }

        res.render("./views/pages/resultadosPesquisa", {livrosCadastrados:livro});//livrosCadastrados faz referência forEach da página EJS onde quero mostrar os resultados, nesse caso, a pa´gina resultadosPesquisa

    });
}; 

exports.editarCadastroLivro_get = (req, res) => {
    let livro = req.params.id;
	Livro.findById(livro, (err, livro) => {
		if(err)
			return res.status(500).send("Erro ao consultar produto.");
		res.render("./views/pages/editarCadastroLivro",{livrosCadastrados:livro});
    });
};

exports.editarCadastroLivro_post = (req, res) => {
    let livro = req.body.id;
	Livro.findById(livro, (err, livro)=>{
		if(err) {
            return res.status(500).send("Erro ao salvar edição do cadastro do livro.");
        }
			
		livro.tituloLivro = req.body.tituloLivro;
        livro.numeroPaginas = req.body.numeroPaginas;
        livro.nomeAutor = req.body.nomeAutor;
        livro.isbn = req.body.isbn;
        livro.edicao = req.body.edicao;
        livro.editora = req.body.editora;
        livro.genero = req.body.genero;           
        livro.dataPublicacao = req.body.dataPublicacao;

		livro.save(err =>{
			if(err)
				return res.status(500).send("Erro ao editar cadastro do livro.");
			return res.redirect("/livros");			
		});
	});
};

exports.deletarLivro =  (req, res) => {
    let livro = req.params.id;

    Livro.deleteOne({_id:livro}, (err, result) => {
        if(err)
            return res.status(500).send("Erro ao excluir registro de livro.");

        res.redirect("/livros");
    })    
};

exports.fichaLivro = (req, res) => {
    Livro.findById(req.params.id, (err, livro) => {
		if(err)
			return res.status(500).send("Erro ao carregar a ficha do livro.");
        res.render("./views/pages/fichaLivro", {livrosCadastrados:livro});
	});   
};

