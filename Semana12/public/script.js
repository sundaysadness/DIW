const API_KEY = "22be4b445f84788cd854c98105196516";

//buscar filmes na API
function fetchMovies(query = "") {

    let URL = "";

    //se nao houver pesquisa, busca filmes populares
    if (query === "") {

        URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;

    } else {

        //se houver pesquisa, busca pelo nome do filme
        URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;

    }

    return fetch(URL)
        .then(res => {

            //verificar se a requisicao deu certo
            if (!res.ok) {
                throw new Error("Erro ao buscar os filmes");
            }

            return res.json();
        })

        .then(data => {
            return data.results;
        });
}

//criar card p cada filme
function createMovieCard(movie) {

    //criando elementos HTML
    let card = document.createElement("div");
    let imagem = document.createElement("img");
    let corpo = document.createElement("div");
    let titulo = document.createElement("h3");
    let ano = document.createElement("p");
    let nota = document.createElement("p");
    let sinopse = document.createElement("p");

    //adicionando classes CSS
    card.classList.add("card-filme");
    imagem.classList.add("poster");
    corpo.classList.add("card-corpo");
    titulo.classList.add("titulo-filme");

    //definindo imagem
    if (movie.poster_path) {
        imagem.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } else {
        imagem.alt = "Poster não disponível";
    }

    imagem.alt = movie.title;

    //definindo o titulo
    titulo.textContent = movie.title;

    //extraindo o ano da data de lancamento
    if (movie.release_date) {
        ano.textContent = "Ano: " + movie.release_date.substring(0, 4);
    } else {
        ano.textContent = "Ano não informado";
    }

    //definindo a nota
    nota.textContent = "Nota: " + movie.vote_average.toFixed(1);

    //definindo a sinopse
    if (movie.overview) {
        let texto = movie.overview;

        if (texto.length > 150) {
            texto = texto.substring(0, 150) + "...";
        }

        sinopse.textContent = texto;

    } else {
        sinopse.textContent = "Sinopse não disponível.";
    }

    //organizando os elementos dentro do card
    corpo.appendChild(titulo);
    corpo.appendChild(ano);
    corpo.appendChild(nota);
    corpo.appendChild(sinopse);

    card.appendChild(imagem);
    card.appendChild(corpo);

    return card;
}

//mostrar filmes na pagina
function renderMovies(movies) {

    let lista = document.getElementById("movie-list");

    //limpa os filmes anteriores
    lista.innerHTML = "";

    //verifica se existem filmes
    if (movies.length === 0) {
        showMessage("Nenhum filme encontrado.");
        return;
    }

    //cria e adiciona cada card
    for (let i = 0; i < movies.length; i++) {

        let card = createMovieCard(movies[i]);

        lista.appendChild(card);
    }

    showMessage("");
}

//mostrar mensagens na pagina
function showMessage(text) {

    document.getElementById("message").textContent = text;
}

//iniciar pagina
function init() {

    showMessage("Carregando filmes...");

    fetchMovies()

        .then(movies => {
            renderMovies(movies);
        })

        .catch(error => {
            console.log(error);
            showMessage("Erro ao carregar os filmes. Verifique sua conexão e sua API Key.");
        });

}

//pesquisar filmes
function searchMovies() {

    let pesquisa = document.getElementById("search").value.trim();

    showMessage("Buscando filmes...");

    fetchMovies(pesquisa)

        .then(movies => {
            renderMovies(movies);
        })

        .catch(error => {
            console.log(error);
            showMessage("Erro ao pesquisar filmes.");
        });

}

//botao buscar
document.getElementById("btnSearch").addEventListener("click", searchMovies);

//apertar enter para pesquisar 
document.getElementById("search").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchMovies();
    }

});

//executar funcao inicial
init();


  