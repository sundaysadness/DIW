//declaracao de variaveis e prompts na tela, com conversao para number
let nome = prompt("Qual seu nome?");
let renda = Number(prompt("Qual é a sua renda mensal?"));
let quantidadeDespesa = Number(prompt("Quantidade de despezas (entre 1 e 5): "));

//regra limite estabelecida
if(quantidadeDespesa < 1)
{
    quantidadeDespesa = 1;
}
else if(quantidadeDespesa > 5)
{
    quantidadeDespesa = 5;
}

//repetir o prompt ate o usuario digitar apenas numeros em renda e quantidadeDespesa
while(isNaN(renda))
{
    renda = Number(prompt("Valor inválido. Insira a renda mensal novamente (apenas números): "));
}
while(isNaN(quantidadeDespesa))
{
    quantidadeDespesa = Number(prompt("Valor inválido. Insira a quantidade de despesas novamente (apenas números): "));
}

//inicializar somaDespesa com zero
let somaDespesa = 0;

//perguntar valor de cada despesa e somar
for(let i = 1; i <= quantidadeDespesa; i++)
{
    let despesa = Number(prompt("Despesa " + i + ":"));
    //checagem de valor valido
    while(isNaN(despesa))
    {
        despesa = Number(prompt("Valor invalido. Insira despesa " + i + " novamente" + ":"));
    }
    somaDespesa = somaDespesa + despesa; 
}

//retirar prompt da caixa de texto
let mensagemFinal = "";
let sobra = 0;

//analise e classificacao do orcamento
if(somaDespesa > renda)
{
    mensagemFinal = "⚠️ Atenção: você gastou mais do que ganhou.";
}
else
{
    sobra = renda - somaDespesa;
    if(sobra >= (renda * 0.3))
    {
        mensagemFinal = "✅ Ótimo: boa margem de sobra.";
    }
    else
    {
        mensagemFinal = "🙂 Ok: dá para melhorar a sobra.";
    }
}

//saida final
let resultado = 
 "Nome: " + nome + "\n" +
 "Renda: R$ " + renda.toFixed(2) + "\n" + 
 "Total de despesas: R$ " + somaDespesa.toFixed(2) + "\n" + 
 "Sobra: R$ " + sobra.toFixed(2)  + "\n" + 
 "Classificação: " + mensagemFinal;

alert(resultado);
console.log(resultado);