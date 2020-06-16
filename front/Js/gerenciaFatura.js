//pega o CNPJ escolhido anteriormente
let meuCodigo = localStorage.getItem("num_nf");
let meuCodigoSec = localStorage.getItem("cod_ibge");
let cidades = [];

window.onload = function () {

  //preenche os campos
  document.getElementById("num_nf").value = localStorage.getItem("num_nf");

  //esta função preenche o campo de municipio
  document.getElementById("cod_ibge").value = localStorage.getItem("nome_municipio") + " - " + localStorage.getItem("uf") + " - " + localStorage.getItem("cod_ibge");

  //estes campos precisam de adaptações para serem aceitos com o padrão yyyy-MM-dd
  let data1 = new Date(localStorage.getItem("dt_nf"));
  let dataFinal1 = String(data1.getFullYear()).padStart(4, '0') + "-" + String(data1.getMonth() + 1).padStart(2, '0') + "-" + String(data1.getDate()).padStart(2, '0');
  document.getElementById("dt_nf").value = dataFinal1;

  adicionarItensFatura();
}

function adicionarItensFatura(){
  fetch(servidor + 'read/itensfatura/' + meuCodigoSec, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //tratamento dos erros
    if (response.status == 200) {
      return response.json().then(function (json) {
        console.log(json);
      });
    } else {
      erros(response.status);
    }
  });
}

//ao selecionar item, mostra as quantidades disponiveis, deixa o usuario preencher valor e quantidade
//colocar em vermelho o disponivel se for negativo

function enviar() {

  //estrutura usada para mandar as informações no fetch
  let info = {
    "dt_nf": "",
  };

  //capturando o valor
  info.dt_nf = document.getElementById("dt_nf").value;

  //transforma as informações em string para mandar
  let corpo = JSON.stringify(info);
  //função fetch para mandar
  fetch(servidor + 'read/fatura/', {
    method: 'PUT',
    body: corpo,
    headers: {
      'Authorization': 'Bearer ' + meuToken
    },
  }).then(function (response) {

    //checar o status do pedido
    //console.log(response);

    //tratamento dos erros
    if (response.status == 200 || response.status == 201) {
      window.location.replace("./fiscFatura.html");
    } else {
      erros(response.status);
    }
  });
}