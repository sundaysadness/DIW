
//endereço da API
const API_URL = "http://localhost:3000/atracoes";

//busca todas as atrações no JSON Server
async function fetchItems() {
  const resposta = await fetch(API_URL);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar as atrações.");
  }

  const itens = await resposta.json();

  return itens;
}

//cria um card para cada atração
function createCard(item) {
  const coluna = document.createElement("div");
  coluna.className = "col";

  const valor = item.valor ?? item.preco ?? "Consulte o local";

  coluna.innerHTML = `
    <div class="card card-lugar h-100">

      <a href="details.html?id=${item.id}">
        <img src="${item.imagemPrincipal}"
             class="card-img-top"
             alt="Foto de ${item.nome}">
      </a>

      <div class="card-body">

        <h3 class="card-title h5">
          <a href="details.html?id=${item.id}">
            ${item.nome}
          </a>
        </h3>

        <p class="card-text texto-corte">
          ${item.descricaoCurta}
        </p>

        <p class="card-text">
          <strong>Categoria:</strong> ${item.categoria}
        </p>

        <p class="card-text">
          <strong>Valor:</strong> ${valor}
        </p>

        <a href="details.html?id=${item.id}""
           class="btn btn-brand">
          Ver detalhes
        </a>

      </div>
    </div>
  `;

  return coluna;
}

//mostra os cards na Home
function renderCards(items) {
  const lista = document.getElementById("listaCards");

  lista.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    const card = createCard(items[i]);

    lista.appendChild(card);
  }
}

//mostra as atrações em destaque no carrossel
function mostrarDestaques(items) {
  let slides = "";
  let bolinhas = "";
  let contador = 0;

  for (let i = 0; i < items.length; i++) {
    const lugar = items[i];

    if (lugar.destaque == true) {

      let classe = "";

      if (contador == 0) {
        classe = "active";
      }

      slides += `
        <div class="carousel-item ${classe}">

          <a href="detalhes.html?id=${lugar.id}">
            <img src="${lugar.imagemPrincipal}"
                 class="slide-img"
                 alt="Foto de ${lugar.nome}">
          </a>

          <div class="carousel-caption">

            <h3 class="slide-titulo">
              <a href="detalhes.html?id=${lugar.id}">
                ${lugar.nome}
              </a>
            </h3>

            <p class="slide-texto">
              ${lugar.descricaoCurta}
            </p>

          </div>
        </div>
      `;

      bolinhas += `
        <button type="button"
                data-bs-target="#carrosselDestaques"
                data-bs-slide-to="${contador}"
                class="${classe}"
                aria-label="Destaque ${contador + 1}">
        </button>
      `;

      contador++;
    }
  }

  document.getElementById("slides").innerHTML = slides;

  document.getElementById("indicadores").innerHTML = bolinhas;

  //inicializa o carrossel depois de inserir os dados
  if (contador > 0) {
    bootstrap.Carousel.getOrCreateInstance(
      document.getElementById("carrosselDestaques")
    );
  }
}

//inicializa a Home
async function init() {
  try {
    const itens = await fetchItems();

    renderCards(itens);

    mostrarDestaques(itens);

  } catch (erro) {
    document.getElementById("listaCards").innerHTML =
      "<p>Não foi possível carregar os lugares. Verifique se o JSON Server está funcionando.</p>";

    console.log(erro);
  }
}

//executa quando a página carregar
if(document.getElementById("listaCards")) 
{
  init();
}


