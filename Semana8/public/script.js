console.log("script carregou");

//dados dos filmes e séries
const catalogo = [
    {id: 1, titulo: "Odisseia", tipo: "filme", ano: 2026, generos: ["Ação", "Fantasia", "Épico"], nota: 8.4, assistido: true },
    {id: 2, titulo: "Angry Birds", tipo: "filme", ano: 2016, generos: ["Animação", "Comédia", "Aventura"], nota: 6.3, assistido: false },
    {id: 3, titulo: "O Convite", tipo: "filme", ano: 2026, generos: ["Comédia", "Drama", "Romance"], nota: 7.4, assistido: true },
    {id: 4, titulo: "Toy Story 5", tipo: "filme", ano: 2026, generos: ["Animação", "Aventura"], nota: 5.0, assistido: false },
    {id: 5, titulo: "Superbad", tipo: "filme", ano: 2007, generos: ["Comédia"], nota: 7.3, assistido: true },
    {id: 6, titulo: "Rick and Morty", tipo: "serie", ano: 2013, generos: ["Animação", "Ficção Científica"], nota: 9.0, assistido: true }
];

//realizar acesso dos dados
console.log(catalogo);
console.log(catalogo[0].titulo);
console.log(catalogo[catalogo.length - 1].ano);

const segundo = catalogo[2].generos[1];
console.log(segundo ?? "O terceiro item não tem segundo gênero.");

//iterators
// A) Listagem com forEach
catalogo.forEach(i => console.log(`- [${i.tipo}] ${i.titulo} (${i.ano})`));

// B) Transformação com map
const titulosEmCaixaAlta = catalogo.map(i => i.titulo.toUpperCase());
console.log(titulosEmCaixaAlta);

// C) Seleção com filter
const naoAssistidos = catalogo.filter(i => i.assistido === false);
console.log("Não assistidos", naoAssistidos.length);

// D) Busca com find
const  a = catalogo.find(i => i.nota >= 9);
console.log(a ? `${a.titulo} - nota ${a.nota}` : "Nenhum item com nota >= 9.");

// E) Agregação com reduce
const mediaGeral = catalogo.reduce((soma, i) => soma + i.nota, 0) / catalogo.length;
const vistos = catalogo.filter(i => i.assistido);
const mediaVistos = vistos.reduce((soma, i) => soma + i.nota, 0) / vistos.length;

console.log(mediaGeral.toFixed(2), mediaVistos.toFixed(2));

// F) Checagens com some e every
console.log("Algum antes de 2000?", catalogo.some(i => i.ano < 2000));
console.log("Todos têm ao menos 1 gênero?", catalogo.every(i => i.generos.length >= 1));

//saída na tela (DOM simples)
const filmes = catalogo.filter(i => i.tipo === "filme").length;
const series = catalogo.filter(i => i.tipo === "serie").length;
const ranking = [...catalogo].sort((a, b) => b.nota - a.nota).slice(0, 3);

document.getElementById("output").innerHTML =
`
  <p>Total: ${catalogo.length}</p>
  <p>Filmes: ${filmes} | Séries: ${series}</p>
  <p>Não assistidos: ${naoAssistidos.length}</p>
  <p>Média geral: ${mediaGeral.toFixed(2)}</p>

  <h3>Top 3</h3>

  <ol>
    ${ranking.map(i => `<li>${i.titulo} (${i.nota})</li>`).join("")}
  </ol>
`;
