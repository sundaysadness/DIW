
//endereço da API
const API_URL = "http://localhost:3000/atracoes";

//busca uma atração específica
async function fetchItem(id) {
  const resposta = await fetch(`${API_URL}/${id}`);

  if (!resposta.ok) {
    throw new Error("Lugar não encontrado.");
  }

  const item = await resposta.json();

  return item;
}

//mostra as informações da atração
function renderDetails(lugar) {
  const area = document.getElementById("detalhes");

  document.title = lugar.nome + " | Lugares de Beagá";

  //monta as fotos da galeria
  let fotos = "";

  if (lugar.fotos) {
    for (let i = 0; i < lugar.fotos.length; i++) {
      fotos += `
        <figure class="galeria-item">

          <img src="${lugar.fotos[i].arquivo}"
               class="galeria-img"
               alt="${lugar.fotos[i].titulo}">

          <figcaption>
            ${lugar.fotos[i].titulo}
          </figcaption>

        </figure>
      `;
    }
  }

  //monta as tags
  let tags = "";

  if (lugar.tags) {
    for (let i = 0; i < lugar.tags.length; i++) {
      tags += `
        <span class="badge badge-categoria me-1 mb-1">
          ${lugar.tags[i]}
        </span>
      `;
    }
  }

  const valor = lugar.valor ?? lugar.preco ?? "Consulte o local";

  area.innerHTML = `
    <section class="mb-5">

      <h2 class="secao-titulo">Informações gerais</h2>

      <div class="row g-4 g-lg-5">

        <div class="col-lg-5">

          <div class="detalhe-foto">

            <img src="${lugar.imagemPrincipal}"
                 class="detalhe-img"
                 alt="Foto de ${lugar.nome}">

          </div>

        </div>

        <div class="col-lg-7">

          <span class="badge badge-categoria mb-2">
            ${lugar.categoria}
          </span>

          <h1 class="h2 titulo-lugar">
            ${lugar.nome}
          </h1>

          <p class="lead">
            ${lugar.descricaoCurta}
          </p>

          <p>
            ${lugar.descricaoCompleta}
          </p>

          <p>
            <strong>Valor:</strong> ${valor}
          </p>

          <p>
            <strong>Tags:</strong>
            ${tags}
          </p>

          <dl class="ficha">

            <div class="ficha-item">

              <dt>Onde fica</dt>

              <dd>${lugar.endereco}</dd>

            </div>

            <div class="ficha-item">

              <dt>Funcionamento</dt>

              <dd>${lugar.disponibilidade}</dd>

            </div>

          </dl>

          <div class="dica">
            <strong>Dica:</strong> ${lugar.dica}
          </div>

        </div>

      </div>

    </section>

    <section class="mb-5">

      <h2 class="secao-titulo">Localização</h2>

      <p>${lugar.endereco}</p>

      <div id="mapa"></div>

    </section>

    <section>

      <h2 class="secao-titulo">Fotos do lugar</h2>

      <div class="galeria">
        ${fotos}
      </div>

    </section>
  `;

  //carrega o mapa com o endereco da atração
  carregarMapa(lugar.endereco);
}

//inicializa a página de detalhes
async function initDetails() {
  const area = document.getElementById("detalhes");

  //pega o ID que veio na URL
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  //verifica se existe ID
  if (!id) {
    area.innerHTML = `
      <p>Nenhum lugar foi selecionado.</p>
      <a href="index.html">Voltar para o início</a>
    `;

    return;
  }

  try {
    const lugar = await fetchItem(id);

    renderDetails(lugar);

  } catch (erro) {

    area.innerHTML = `
      <p>Lugar não encontrado.</p>
      <a href="index.html">Voltar para o início</a>
    `;

    console.log(erro);
  }
}

//token de acesso do Mapbox
const MAPBOX_TOKEN = "pk.eyJ1IjoidGF5bGVyciIsImEiOiJjbXdlMmJrdGEwYW54MnlweDIxYWt2ZDZlIn0.Es7idFwNSUrh0Jr0HYFBkw";

//carrega o mapa de acordo com o endereço
async function carregarMapa(endereco) {

    try {
        //completa o endereco com a cidade e o estado
        const enderecoCompleto =
            `${endereco}, Belo Horizonte, MG, Brasil`;

        //consulta o endereco na API do Mapbox
        const resposta = await fetch(
            `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(enderecoCompleto)}&country=BR&language=pt&limit=1&access_token=${MAPBOX_TOKEN}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao localizar o endereço.");
        }

        const dados = await resposta.json();

        //verifica se o endereco foi encontrado
        if (dados.features.length === 0) {
            document.getElementById("mapa").innerHTML =
                "Não foi possível localizar este endereço.";

            return;
        }

        //obtem longitude e latitude
        const coordenadas = dados.features[0].geometry.coordinates;

        //cria o mapa
        const mapa = new mapboxgl.Map({

            container: "mapa",

            style: "mapbox://styles/mapbox/streets-v12",

            center: coordenadas,

            zoom: 15,

            accessToken: MAPBOX_TOKEN

        });

        //adiciona um marcador no endereço
        new mapboxgl.Marker()
            .setLngLat(coordenadas)
            .addTo(mapa);

    } catch (erro) {

        console.log(erro);

        document.getElementById("mapa").innerHTML =
            "Não foi possível carregar o mapa.";

    }
}

//executa quando a página de detalhes carregar
if (document.getElementById("detalhes")) 
{
  initDetails();
}
