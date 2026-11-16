//B.1. Base de dados (JSON)
const data = {
    "produtos": [
      {
        "id": 1,
        "nome": "Smartphone Galaxy S23",
        "preco": 3499.90,
        "categoria": "Celulares",
        "imagem": "img/img1.webp",
        "descricao": "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
        "emEstoque": true
      },
      {
        "id": 2,
        "nome": "Notebook Dell Inspiron 15",
        "preco": 4599.00,
        "categoria": "Notebooks",
        "imagem": "img/img2.webp",
        "descricao": "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
        "emEstoque": false
      },
      {
        "id": 3,
        "nome": "Fone Bluetooth",
        "preco": 120.00,
        "categoria": "Acessórios",
        "imagem": "img/img3.avif",
        "descricao": "Cancelamento de ruído e 24 horas de bateria.",
        "emEstoque": true
      },
      {
        "id": 4,
        "nome": "Mouse Gamer RGB",
        "preco": 150.00,
        "categoria": "Acessórios",
        "imagem": "img/img4.webp",
        "descricao": "Alta precisão projetado com sensores avançados, botões customizáveis e ergonomia otimizada para jogos.",
        "emEstoque": false
      },
      {
        "id": 5,
        "nome": "Notebook Office 14",
        "preco": 2799.00,
        "categoria": "Notebooks",
        "imagem": "img/img5.jpg",
        "descricao": "Leve e ideal para trabalho e estudos.",
        "emEstoque": false
      },
      {
        "id": 6,
        "nome": "Smartphone Lite S",
        "preco": 899.00,
        "categoria": "Celulares",
        "imagem": "img/img6.avif",
        "descricao": "Smartphone com bateria duradoura e com sistema rápido.",
        "emEstoque": true
      },
      {
        "id": 7,
        "nome": "Smartphone Nova X",
        "preco": 1999.00,
        "categoria": "Celulares",
        "imagem": "img/img7.webp",
        "descricao": "Tela de 6,5 polegadas, câmera dupla.",
        "emEstoque": false
      },
      {
        "id": 8,
        "nome": "Notebook Pro 13",
        "preco": 4599.00,
        "categoria": "Notebooks",
        "imagem": "img/img8.jpg",
        "descricao": "Inteli 7i, 16 GB de RAM, SSD de 512 GB.",
        "emEstoque": true
      }
    ]
  }

//B.2. Seleção de elementos (DOM)
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

//B.3. Funções obrigatórias (organização do código)
//formatPrice(preco)
function formatPrice(preco) 
{
  return "R$ " + preco.toFixed(2);
}

//createProductCard(produto)
function createProductCard(produto)
{
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");
  card.style.padding = "14px";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
 
  const titulo = document.createElement("h3");
  titulo.classList.add("card-title");
  titulo.textContent = produto.nome;
 
  const preco = document.createElement("p");
  preco.classList.add("card-price");
  preco.textContent = formatPrice(produto.preco);
 
  const categoria = document.createElement("p");
  categoria.classList.add("card-category");
  categoria.textContent = produto.categoria;
 
  const acoes = document.createElement("div");
  acoes.classList.add("card-actions");
 
  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Ver detalhes";
  btnDetalhes.addEventListener("click", function () { showProductDetails(produto); } );
 
  const btnDestacar = document.createElement("button");
  btnDestacar.textContent = "Destacar";
  btnDestacar.addEventListener("click", function () { card.classList.toggle("highlight"); } );
 
  acoes.appendChild(btnDetalhes);
  acoes.appendChild(btnDestacar);
 
  card.appendChild(img);
  card.appendChild(titulo);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(acoes);
 
  return card;
}

//renderProducts(produtos)
function renderProducts(produtos)
{
  productList.innerHTML = "";
 
  if(produtos.length === 0) 
  {
    productList.innerHTML = '<p class="vazio">Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach(function (produto) { productList.appendChild(createProductCard(produto)); } );

  //B.5. Uso de querySelectorAll (obrigatório)
  const cards = document.querySelectorAll(".card");
  cards.forEach(function (card) 
  {
      console.log("Card renderizado, data-id:", card.getAttribute("data-id"));
      card.style.transition = "box-shadow 0.2s";
  });
}

//renderCategories()
function renderCategories() 
{
  const categorias = [];
  data.produtos.forEach(function (p) {
    if(!categorias.includes(p.categoria)) 
    {
      categorias.push(p.categoria);
    }
  });
 
  categorySelect.innerHTML = '<option value="Todas">Todas</option>';
  categorias.forEach(function (cat) 
  {
    const option = document.createElement("option");
    option.setAttribute("value", cat);
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}
 
//showProductDetails(produto)
function showProductDetails(produto) 
{
  const estoque = produto.emEstoque
    ? '<span class="com-estoque">Em estoque</span>'
    : '<span class="sem-estoque">Indisponível</span>';
 
  productDetails.innerHTML =
    '<img src="' + produto.imagem + '" alt="' + produto.nome + '">' +
    "<h3>" + produto.nome + "</h3>" +
    "<p><strong>Preço:</strong> " + formatPrice(produto.preco) + "</p>" +
    "<p><strong>Categoria:</strong> " + produto.categoria + "</p>" +
    "<p><strong>Estoque:</strong> " + estoque + "</p>" +
    "<p><strong>Descrição:</strong> " + produto.descricao + "</p>";
}
 
//filterProducts()
function filterProducts() 
{
  const texto = searchInput.value.trim().toLowerCase();
  const categoria = categorySelect.value;
 
  return data.produtos.filter(function (p) {
    const bateNome = p.nome.toLowerCase().includes(texto);
    const bateCategoria = categoria === "Todas" || p.categoria === categoria;
    return bateNome && bateCategoria;
  });
}

//B.4. Cards com botões e eventos (addEventListener)
searchInput.addEventListener("input", function () { renderProducts(filterProducts()); } );
 
categorySelect.addEventListener("change", function () { renderProducts(filterProducts()); } );
 
btnRender.addEventListener("click", function () { renderProducts(filterProducts()); } );
 
renderCategories();
renderProducts(data.produtos);